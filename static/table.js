$(function() {
    $('#name').focus();
    $('#name')
        .on('keyup', function() {
            if ($('#name').val()) {
                $.getJSON($SCRIPT_ROOT + '/_name_search', {name: $('#name').val()}, function(data) {
                    $('#results').empty();
                    let htmlString = '<ul>';
                    for (let result of data['results']) {
                        htmlString +=
                            `<li class="result">${result.name}: <a class='table-link' href="/table_group?table=${result.table}">Table ${result.table}</a>.</li>`;
                    }
                    if (data['results'].length === 0) {
                        htmlString += `<li class="result">No results - try first name.</li>`;
                    }
                    htmlString += '<ul>';
                    $(htmlString).appendTo('#results');
                });
            }
            return true;
        });
});
