var data = {
	selectedEntry: undefined,
	entries: []
};


var titleEl;
var dateEl;
var bodyEl;

// Get references to html dom elements 
$(function() {
	titleEl = $("#title");
	dateEl = $("#date");
	bodyEl = $("#markdown");
});

// Get the selected entry
function getSelectedEntry(index) {
	return data.entries[index];
}

// Select an entry
function selectEntry(index) {
	data.selectedEntry = index;
	var entry = getSelectedEntry(index);
	titleEl.text(entry.title);
	dateEl.text(entry.date);
	bodyEl.text(entry.body);
}

// Create a new entry
function newEntry() {
	var entry = {
		title: 'New entry',
		date: new Date(),
		body: '',
	};
	data.entries.push(entry);
	selectEntry(data.entries.length - 1);
	refreshList();
}

// Save entry
function save(date,title,body){
	"use strict";
	var entry = data.entries[data.selectedEntry];
	entry.date = date;
	entry.title = title;
	entry.body = body;
	chrome.storage.sync.setItem("entry"+data.selectedEntry,{
		date:entry.date,
		title:entry.title,
		body:entry.body
	});
	chrome.storage.sync.setItem("selectedEntry",data.selectedEntry);
}

$(function load() {
	"use strict";
	if(chrome.storage.sync && chrome.storage.sync.selectedEntry ){
		var i, entry;
		for(i = 0; chrome.storage.sync["entry"+i]; i++){
			data.entries.push(chrome.storage.sync["entry"+i]);
		}
		data.selectedEntry = chrome.storage.sync.selected;
		entry = data.entries[data.selectedEntry];
		$("#date").val(entry.date);
		$("#title").text(entry.title);
		$("#markdown").val(entry.body);
		refreshList();
	}else{
		newEntry();
	}
});