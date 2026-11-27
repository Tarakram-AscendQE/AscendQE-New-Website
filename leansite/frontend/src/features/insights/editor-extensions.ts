// TipTap extensions shared by the article reader and the studio editor, so both render the same document.
import TiptapImage from '@tiptap/extension-image';
import TiptapLink from '@tiptap/extension-link';
import StarterKit from '@tiptap/starter-kit';

export function articleExtensions({ editable }: { editable: boolean }) {
  return [
    // StarterKit v3 includes Link; it is configured separately below.
    StarterKit.configure({ heading: { levels: [1, 2, 3] }, link: false }),
    TiptapLink.configure({
      openOnClick: !editable,
      autolink: editable,
      HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' },
    }),
    TiptapImage.configure({ HTMLAttributes: { loading: 'lazy' } }),
  ];
}
