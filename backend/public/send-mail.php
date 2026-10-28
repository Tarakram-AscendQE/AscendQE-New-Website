<?php

header('Content-Type: application/json; charset=utf-8');

define('SECURE_MAILER', true);
require_once __DIR__ . '/aws-ses-helper.php';
$config = require __DIR__ . '/email-config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.'
    ]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid JSON request.'
    ]);
    exit;
}

$firstName   = trim((string)($data['firstName'] ?? $data['first_name'] ?? ''));
$lastName    = trim((string)($data['lastName'] ?? $data['last_name'] ?? ''));
$email       = trim((string)($data['email'] ?? $data['workEmail'] ?? $data['work_email'] ?? ''));
$company     = trim((string)($data['company'] ?? ''));
$jobTitle    = trim((string)($data['jobTitle'] ?? $data['job_title'] ?? ''));
$phone       = trim((string)($data['phone'] ?? ''));
$interest    = trim((string)($data['interest'] ?? $data['offer'] ?? ''));
$teamSize    = trim((string)($data['teamSize'] ?? $data['team_size'] ?? ''));
$product     = trim((string)($data['product'] ?? $data['application'] ?? ''));
$application = trim((string)($data['application'] ?? $data['product'] ?? ''));
$scope       = trim((string)($data['scope'] ?? ''));
$message     = trim((string)($data['message'] ?? $data['comments'] ?? ''));
$formType    = trim((string)($data['formType'] ?? ''));

if ($firstName === '' || $lastName === '' || $email === '' || $company === '') {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Please complete all required fields.'
    ]);
    exit;
}

if ($phone !== '' && !preg_match('/^\d{10}$/', $phone)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Please enter a valid 10-digit phone number.'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Please enter a valid email address.'
    ]);
    exit;
}

$isPricing = ($formType === 'pricing' || $teamSize !== '');

if ($isPricing) {
    $subject = 'New Pricing Consultation Request - ' . $firstName . ' ' . $lastName;
    $heading = 'New Pricing Consultation / Proposal Request';
} elseif ($formType === 'contact' || $application !== '') {
    $subject = 'New Contact Enquiry - ' . $firstName . ' ' . $lastName . ($company !== '' ? ' (' . $company . ')' : '');
    $heading = 'New Contact & Evaluation Enquiry';
} else {
    $subject = 'New Schedule a Demo Request - ' . $firstName . ' ' . $lastName;
    $heading = 'New Schedule a Demo Request';
}

// Build HTML email body
$htmlBody = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a; padding: 20px;">';
$htmlBody .= '<div style="max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background: #ffffff;">';
$htmlBody .= '<h2 style="color: #0284c7; margin-top: 0;">' . htmlspecialchars($heading) . '</h2>';
$htmlBody .= '<p style="color: #64748b; font-size: 13px;">Submitted on ascendqe.com</p><hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;">';
$htmlBody .= '<table style="width: 100%; border-collapse: collapse;">';
$htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b; width: 160px;"><strong>Name:</strong></td><td style="padding: 6px 0;">' . htmlspecialchars($firstName . ' ' . $lastName) . '</td></tr>';
$htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b;"><strong>Work Email:</strong></td><td style="padding: 6px 0;"><a href="mailto:' . htmlspecialchars($email) . '">' . htmlspecialchars($email) . '</a></td></tr>';
$htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b;"><strong>Company:</strong></td><td style="padding: 6px 0;">' . htmlspecialchars($company) . '</td></tr>';

if ($jobTitle !== '') {
    $htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b;"><strong>Job Title:</strong></td><td style="padding: 6px 0;">' . htmlspecialchars($jobTitle) . '</td></tr>';
}
if ($phone !== '') {
    $htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b;"><strong>Phone:</strong></td><td style="padding: 6px 0;">' . htmlspecialchars($phone) . '</td></tr>';
}
if ($application !== '') {
    $htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b;"><strong>Application / Project:</strong></td><td style="padding: 6px 0;">' . htmlspecialchars($application) . '</td></tr>';
}
if ($interest !== '') {
    $htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b;"><strong>Area of Interest / Offer:</strong></td><td style="padding: 6px 0;">' . htmlspecialchars($interest) . '</td></tr>';
}
if ($scope !== '') {
    $htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b; vertical-align: top;"><strong>Test Cases & Criteria:</strong></td><td style="padding: 6px 0;">' . nl2br(htmlspecialchars($scope)) . '</td></tr>';
}
if ($teamSize !== '') {
    $htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b;"><strong>Team Size:</strong></td><td style="padding: 6px 0;">' . htmlspecialchars($teamSize) . '</td></tr>';
}
if ($product !== '' && $product !== $application) {
    $htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b;"><strong>Product:</strong></td><td style="padding: 6px 0;">' . htmlspecialchars($product) . '</td></tr>';
}
if ($message !== '' && $message !== $scope) {
    $htmlBody .= '<tr><td style="padding: 6px 0; color: #64748b; vertical-align: top;"><strong>Message:</strong></td><td style="padding: 6px 0;">' . nl2br(htmlspecialchars($message)) . '</td></tr>';
}

$htmlBody .= '</table></div></body></html>';

// Build plain-text fallback
$textBody = $heading . " on ascendqe.com\n\n";
$textBody .= "Name: " . $firstName . " " . $lastName . "\n";
$textBody .= "Work Email: " . $email . "\n";
$textBody .= "Company: " . $company . "\n";
if ($jobTitle !== '')    $textBody .= "Job Title: " . $jobTitle . "\n";
if ($phone !== '')       $textBody .= "Phone: " . $phone . "\n";
if ($application !== '') $textBody .= "Application / Project: " . $application . "\n";
if ($interest !== '')    $textBody .= "Interest / Offer: " . $interest . "\n";
if ($scope !== '')       $textBody .= "Test Cases & Criteria: \n" . $scope . "\n";
if ($teamSize !== '')    $textBody .= "Team Size: " . $teamSize . "\n";
if ($product !== '' && $product !== $application)  $textBody .= "Product: " . $product . "\n";
if ($message !== '' && $message !== $scope)        $textBody .= "Message: " . $message . "\n";
if ($interest !== '') $textBody .= "Area of Interest: " . $interest . "\n";
if ($teamSize !== '') $textBody .= "Team Size: " . $teamSize . "\n";
if ($product !== '')  $textBody .= "Product: " . $product . "\n";
if ($message !== '')  $textBody .= "Message: " . $message . "\n";

// Send directly via AWS SES REST API
$result = sendAwsSesEmail($subject, $htmlBody, $textBody, $email, $config);

if (!$result['success']) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Email delivery failed: ' . ($result['error'] ?? 'Unknown error')
    ]);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Thank you! We will be in touch within 24 hours.'
]);
