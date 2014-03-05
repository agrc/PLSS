(function() {
    require({
        baseUrl: '/plss/src',
        packages: [
            'app',
            'agrc',
            'dojo',
            'dojox',
            'dijit',
            'esri',
            'ijit',
            'mustache',
            'plss', {
                name: 'jquery',
                main: 'jquery'
            }, {
                name: 'bootstrap',
                location: 'bootstrap/js',
                main: 'bootstrap'
            }
        ]
    }, ['app/App'], function(App) {
        var app = new App({}, 'app');
        app.startup();
    });
})();