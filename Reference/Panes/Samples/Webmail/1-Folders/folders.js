﻿// Our model just contains a list of folders and
// an observable to hold the selected folder.

T.registerModel(function (pane) {
    this.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    this.selectedFolder = ko.observable('Inbox');
});