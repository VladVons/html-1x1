

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

    const elEditorBtnSave = document.getElementById('viEditorBtnSave')
    elEditorBtnSave.addEventListener('click', function(aEvent) {
        editor.save().then((aData) => {
            console.log(aData)
        }).catch((aErr) => {
            console.log('saving failed', aErr)
        })
    })
}

editorJsInit()
