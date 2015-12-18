CKEDITOR.dialog.add('sitepagesDialog', function(editor) {
    return {
        title: 'Link to site page',
        minWidth: 400,
        minHeight: 200,
        contents: [{
            id: 'tab-basic',
            label: 'Basic Settings',
            elements: [{
                type: 'select',
                id: 'sitepages',
                label: 'Link to...',
                className: 'sitepages-class',

                elemId: null,
                items: [
                    ['--- Select a page---', 0]
                ],

                onLoad: function(element) {
                    var element_id = '#' + this.getInputElement()
                        .$.id;

                    $.getJSON(
                        '/admin/pages/pages.json',
                        function(jsondata) {
                            var html = '';
                            var len = jsondata.length;
                            for (var i = 0; i <
                                len; i++) {
                                html +=
                                    '<option value="/' +
                                    jsondata[i]
                                    .value +
                                    '">' +
                                    jsondata[i]
                                    .option +
                                    '</option>';
                            }
                            $(element_id).append(
                                html);
                        });

                }
            }]
        }],
        onShow: function() {
            var selection = editor.getSelection();
            var element = selection.getStartElement();

            if (element)
                element = element.getAscendant('a', true);

            if (!element || element.getName() != 'a') {
                element = editor.document.createElement('a');
                this.insertMode = true;
            } else
                this.insertMode = false;

            this.element = element;
            if (!this.insertMode)
                this.setupContent(this.element);
        },
        onOk: function() {
            var dialog = this;
            var selection;

            if (CKEDITOR.env.ie) {
                selection = editor.getSelection().document.$.selection
                    .createRange().text;
            } else {
                selection = editor.getSelection().getNative();
            }

            var link = editor.document.createElement('a');
            link.setAttribute('href', dialog.getValueOf('tab-basic',
                'sitepages'));
            link.setHtml(selection);

            editor.insertElement(link);

        }
    };
});
