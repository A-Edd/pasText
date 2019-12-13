function returnPaste (){
    document.getElementById('textarea').value=document.getElementById('content').innerHTML;
    console.log(document.getElementById('textarea').value);
    return true;
}
