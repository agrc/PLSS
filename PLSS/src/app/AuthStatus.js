﻿define([
    'app/config',

    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',

    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/text!app/templates/AuthStatus.html',
    'dojo/topic',
    'dojo/_base/declare',
    'dojo/_base/lang'
], function (
    config,

    _TemplatedMixin,
    _WidgetBase,

    domClass,
    domConstruct,
    template,
    topic,
    declare,
    lang
) {
    return declare([_WidgetBase, _TemplatedMixin], {

        templateString: template,

        constructor: function () {
            // summary:
            //      first function to fire after page loads
            console.info('app.AuthStatus::constructor', arguments);

            this.inherited(arguments);
        },
        postCreate: function () {
            // summary:
            //      Fires when
            console.log('app.AuthStatus::postCreate', arguments);

            this.setupConnections();

            this.inherited(arguments);
        },
        setupConnections: function () {
            // summary:
            //      sets up events, topics, etc
            // evt
            console.log('app.AuthStatus::setupConnections', arguments);

            topic.subscribe('app.authorize', lang.hitch(this, 'updateLogout'));
        },
        updateLogout: function (args) {
            // summary:
            //      handles the login click event
            // evt
            console.log('app.AuthStatus::updateLogout', arguments);

            if (args && args.token) {
                this._updateDisplayFor('login');

                return;
            }

            this._updateDisplayFor('logout');
        },
        logout: function () {
            // summary:
            //      handles the login click event
            // evt
            console.log('app.AuthStatus::updateLogout', arguments);

            topic.publish('app.logout');
            this._updateDisplayFor('logout');
        },
        _updateDisplayFor: function (status) {
            console.log('app.AuthStatus::_updateDisplayFor', arguments);

            if (status === 'login') {
                this.userSettingsNode = domConstruct.place('<li><a href=\'' +
                    config.urls.settings +
                    '\'><span class=\'glyphicon glyphicon-user\'></span> Settings</a></li>', this.domNode, 'after');
                domClass.replace(this.loginNode, 'hidden', 'show');

                domClass.replace(this.logoutNode, 'show', 'hidden');

                return;
            }

            domConstruct.destroy(this.userSettingsNode);

            domClass.replace(this.logoutNode, 'hidden', 'show');
            domClass.replace(this.loginNode, 'show', 'hidden');
        }
    });
});
