import { Mark, mergeAttributes } from '@tiptap/core';

// Archivo de configuracion para poder cambiar el tamaño de letra del editor de texto TipTap
const FontSize = Mark.create({
    name: 'fontSize',

    addAttributes() {
        return {
            size: {
                default: '16px',
                parseHTML: element => element.style.fontSize,
                renderHTML: attributes => {
                    return { style: `font-size: ${attributes.size}` };
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'span[style*=font-size]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
    // @ts-ignore
    addCommands() {
        return {
            // @ts-ignore
            setFontSize: size => ({ commands }) => {
                return commands.setMark(this.name, { size });
            },
            // @ts-ignore
            unsetFontSize: () => ({ commands }) => {
                return commands.unsetMark(this.name);
            },
        };
    },
});

export default FontSize;