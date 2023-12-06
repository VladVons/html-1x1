/*
Created: 2023.12.06
Author: Vladimir Vons <VladVons@gmail.com>
License: GNU, see LICENSE for more details
*/


function editorJsInit() {
    const urlRoot = 'assets/cgi/editorjs.py'

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
                    endpoints: {
                        byFile: urlRoot + '?mode=save_img'
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
        editor.save().then((aEditorData) => {
            const url = urlRoot + '?mode=save_editor'
            postJson(url, {'data': aEditorData})
            .then(data => {
                if (data.status == 'err') {
                    showTooltip('error ' + data.info)
                }else{
                    showTooltip(`saved with ${url}. status ${data.status}`)
                }
            })
        })
    })

    const elEditorBtnLoad = document.getElementById('viEditorBtnLoad')
    elEditorBtnLoad.addEventListener('click', function(aEvent) {
        const url = urlRoot + '?mode=load_editor'
        postJson(url, {})
        .then(data => {
            console.log('-x1', data)
            if (Object.keys(data).length) {
                editor.isReady.then(() => {
                    editor.render(data)
                    showTooltip('loaded with ' + url)
                })
            }else{
                showTooltip('no saved data')
            }
        })
    })
}

editorJsInit()
