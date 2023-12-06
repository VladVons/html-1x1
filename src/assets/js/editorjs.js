/*
Created: 2023.12.06
Author: Vladimir Vons <VladVons@gmail.com>
License: GNU, see LICENSE for more details
*/


function editorJsInit() {
    const editor = new EditorJS({
        holder: 'editor_js',
        autofocus: true,
        tools: {
            header: {
                class: Header,
                inlineToolbar: ['link']
            },
            image: {
                class: ImageTool,
                inlineToolbar: true,
                config: {
                    endpoints1: {
                        byFile: 'http://localhost:8008/uploadFile',
                        byUrl: 'http://localhost:8008/fetchUrl'
                    }
                }
            },
            list: {
                class: List,
                inlineToolbar: ['link']
            },
            linkTool: {
                class: LinkTool,
                config: {
                    endpoint: 'http://localhost:8008/fetchUrl',
                }
            },
            code: {
                class: CodeTool
            },
            table: {
                class: Table
            },
        }
    })

    const url = 'assets/cgi/editorjs.py'

    const elEditorBtnSave = document.getElementById('viEditorBtnSave')
    elEditorBtnSave.addEventListener('click', function(aEvent) {
        editor.save().then((aData) => {
            postJson(url, {'mode':'save', 'data': aData})
                .then(data => {
                    console.log(aData)
                })
         }).catch((aErr) => {
            console.log('saving failed', aErr)
        })
    })

    const elEditorBtnLoad = document.getElementById('viEditorBtnLoad')
    elEditorBtnLoad.addEventListener('click', function(aEvent) {
        editor.save().then((aData) => {
            postJson(url, {'mode':'load'})
                .then(data => {
                    editor.isReady.then(() => {
                        editor.render(data);
                    })
                })
         }).catch((aErr) => {
            console.log('loading failed', aErr)
        })
    })


}

editorJsInit()
