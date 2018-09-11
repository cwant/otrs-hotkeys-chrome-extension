$(document).ready(function() {
  keycodes = {
    'first': 70, // 'f' key
    'last': 76, // 'l' key
    'prev': 80, // 'p' key
    'next': 78  // 'n' key
  };

  // current Article ID number, e.g. '173638'
  current = $('#ArticleTable tr.Active input.ArticleID').val();

  // initialize the index of the current article in the articles array
  current_index = undefined;

  // List of all articles
  articles =
    $('#ArticleTable input.ArticleID').map(function(n, i) {
      var this_val = $(this).val();
      if (this_val == current) {
        current_index = n;
      }
      return $(this).val();
    }).get().reverse();

  document.onkeyup = function(e) {
    var new_index = current_index;
    if (e.which == keycodes['first']) {
      new_index = 0;
    }
    else if (e.which == keycodes['last']) {
      new_index = articles.length - 1;
    }
    else if (e.which == keycodes['prev']) {
      new_index = current_index - 1;
      if (new_index < 0) {
        // Out of range, reset
        new_index = current_index;
      }
    }
    else if (e.which == keycodes['next']) {
      new_index = current_index + 1;
      if (new_index >= articles.length) {
        // Out of range, reset
        new_index = current_index;
      }
    }

    if (new_index != current_index) {
      // Index changed, load new article
      var old_row_id = "#Row" + String(current_index + 1);
      var new_row_id = "#Row" + String(new_index + 1);
      current_index = new_index;
      current = articles[current_index];
      Core.Agent.TicketZoom.LoadArticleFromExternal(current);
      $(old_row_id).removeClass('Active').removeClass('UnreadArticles');
      $(new_row_id).addClass('Active');
    }
  };
});
