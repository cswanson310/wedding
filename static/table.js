$(function() {
    $('#name').focus();
    $('#name')
        .on('keydown', function() {
            if ($('#name').val()) {
                console.log($('#name').val());
                $.getJSON($SCRIPT_ROOT + '/_name_search', {name: $('#name').val()}, function(data) {
                    $('#results').empty();
                    let htmlString = '<ul>';
                    for (let result of data['results']) {
                        htmlString += `<li>${result.name}: Table ${result.table}</li>`;
                    }
                    htmlString += '<ul>';
                    $(htmlString).appendTo('#results');
                });
            }
            return true;
        });
});
