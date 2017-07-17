//Dialog box

  // Locate dialog
  var dialog = document.querySelector('dialog');

  // Register dialog (once per dialog)
  dialogPolyfill.registerDialog(dialog);

  // Register clicks
  $(".dialog-open").click(function(e){
    $("body").addClass("dialog-is-open");
    dialog.showModal();
    console.log("Dialog opened");
  });

  // Dialog closed using button
  $(".dialog-close").click(function(e){
    console.log("Dialog closed explictly");
    dialog.close();
  });
  
  dialog.addEventListener('cancel', function() {
    console.log('Dialog canceled');
  });

  dialog.addEventListener('close', function() {
    $("body").removeClass("dialog-is-open");
    // console.log('Dialog closed');
  });

$('a.nojump').click(function(e)
{
    

    // Cancel the default action
    e.preventDefault();
});