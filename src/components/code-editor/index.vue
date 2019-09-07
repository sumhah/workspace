<template>
    <div class="code-editor">
        <textarea ref="textarea"></textarea>
    </div>
</template>

<script>
    import CodeMirror from 'codemirror';

    export default {
        name: 'CodeEditor',

        props: {
            text: {
                type: String,
                default: 'please input',
            }
        },

        mounted() {
            const editor = CodeMirror.fromTextArea(this.$refs.textarea, {
                tabSize: 4,
                styleActiveLine: true,
                lineNumbers: true,
                line: true,
                foldGutter: true,
                styleSelectedText: true,
                mode: 'text/javascript',
                // keyMap: "sublime",
                matchBrackets: true,
                showCursorWhenSelecting: true,
                // theme: "monokai",
                extraKeys: { "Ctrl": "autocomplete" },
                hintOptions:{
                    completeSingle: false
                }
            });
            // editor.setValue(this.text);
        },
    };
</script>

<style scoped>

</style>
