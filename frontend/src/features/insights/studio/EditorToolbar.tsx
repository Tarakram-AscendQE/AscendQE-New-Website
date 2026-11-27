import { useEditorState, type Editor } from '@tiptap/react';
import { Bold, Code, ImagePlus, Italic, Link2, List, ListOrdered, Minus, Quote, type LucideIcon } from 'lucide-react';

type BlockStyle = 'paragraph' | '1' | '2' | '3';

interface EditorToolbarProps {
  editor: Editor;
  onLink: () => void;
  onImage: () => void;
  imageBusy: boolean;
}

function ToolButton({
  icon: Icon,
  label,
  active,
  disabled,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      // Keep the editor selection while clicking the toolbar.
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
    >
      <Icon aria-hidden="true" />
    </button>
  );
}

/** Formatting toolbar for the article body (text style, marks, lists, blocks, link, image). */
export function EditorToolbar({ editor, onLink, onImage, imageBusy }: EditorToolbarProps) {
  const state = useEditorState({
    editor,
    selector: ({ editor: current }) => ({
      block: (current.isActive('heading', { level: 1 })
        ? '1'
        : current.isActive('heading', { level: 2 })
          ? '2'
          : current.isActive('heading', { level: 3 })
            ? '3'
            : 'paragraph') as BlockStyle,
      bold: current.isActive('bold'),
      italic: current.isActive('italic'),
      bulletList: current.isActive('bulletList'),
      orderedList: current.isActive('orderedList'),
      blockquote: current.isActive('blockquote'),
      codeBlock: current.isActive('codeBlock'),
      link: current.isActive('link'),
    }),
  });

  const setBlock = (value: BlockStyle) => {
    const chain = editor.chain().focus();
    if (value === 'paragraph') chain.setParagraph().run();
    else chain.setHeading({ level: Number(value) as 1 | 2 | 3 }).run();
  };

  return (
    <div className="studio-toolbar" role="toolbar" aria-label="Text formatting">
      <select
        aria-label="Text style"
        value={state.block}
        onChange={(event) => setBlock(event.target.value as BlockStyle)}
      >
        <option value="paragraph">Normal text</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
      </select>
      <span className="studio-tb-sep" aria-hidden="true" />
      <ToolButton
        icon={Bold}
        label="Bold"
        active={state.bold}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <ToolButton
        icon={Italic}
        label="Italic"
        active={state.italic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <ToolButton
        icon={List}
        label="Bulleted list"
        active={state.bulletList}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <ToolButton
        icon={ListOrdered}
        label="Numbered list"
        active={state.orderedList}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />
      <ToolButton
        icon={Quote}
        label="Quote"
        active={state.blockquote}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />
      <ToolButton
        icon={Code}
        label="Code block"
        active={state.codeBlock}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      />
      <ToolButton icon={Minus} label="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()} />
      <span className="studio-tb-sep" aria-hidden="true" />
      <ToolButton icon={Link2} label="Link" active={state.link} onClick={onLink} />
      <ToolButton
        icon={ImagePlus}
        label={imageBusy ? 'Uploading image…' : 'Add image'}
        disabled={imageBusy}
        onClick={onImage}
      />
    </div>
  );
}
