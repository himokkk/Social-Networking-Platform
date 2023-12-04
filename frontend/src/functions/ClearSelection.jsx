const clearSelection = function() {
    if (window.getSelection) {window.getSelection().removeAllRanges();}
    else if (document.selection) {document.selection.empty();}
}
    
export default clearSelection;
//test
