CKEDITOR.plugins.add( 'sitepages', {
    icons: 'sitepages',
    init: function( editor ) {
        editor.addCommand( 'sitepages', new CKEDITOR.dialogCommand( 'sitepagesDialog' ) );
        editor.ui.addButton( 'Sitepages', {
            label: 'Insert link to site page',
            command: 'sitepages',
            toolbar: 'insert'
        });

        CKEDITOR.dialog.add( 'sitepagesDialog', this.path + 'dialogs/sitepages.js' );
    }
});