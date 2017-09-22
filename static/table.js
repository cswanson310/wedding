$(function() {
    $('#name').focus();
    $('#name')
        .on('keyup', function() {
            if ($('#name').val()) {
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
