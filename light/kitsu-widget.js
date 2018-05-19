ready(start);

function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function start() {
    appendToWidget("body", "style", "", "@import url(https://fonts.googleapis.com/css?family=Noto+Sans:400,700);.ki-widget-container{text-align:center;display:flex;flex-direction:row;flex-wrap:wrap;margin:0 auto;align-items:center;justify-content:center;color:#333;font-family:'Noto Sans',sans-serif;background-color:#fff}.ki-widget-personal-details .bio, .ki-widget-stats .count{color:#FD8320}.kitsu-widget{border-radius:1%;border:1px solid #e2e2e2;max-width:380px}.ki-widget-item{flex:1;padding:4px}.ki-widget-photo{flex:2;padding-top:10px;}.ki-widget-photo img{border-radius:100%;max-width:100px}.ki-widget-photo img:hover{opacity:0.8}.ki-widget-personal-details{flex:6}.ki-widget-personal-details .full-name{font-size:1.5em;line-height:1.5em}.ki-widget-personal-details .ki-widget-stats .count{font-size:1.2em;font-weight:700}.ki-widget-hr{border:1px solid #e2e2e2}.ki-widget-link{color:#FD8320}.ki-widget-follow button{width:100%;height:2em;border:none;background:#ddd}");
    var widgets = document.querySelectorAll('.kitsu-widget');
    for (var i = 0; i < widgets.length; i++) {
        var parentNode = widgets[i];
        parentNode.setAttribute("id", "widget" + i);
        appendToWidget("#widget" + i, "div", "", '<div class="ki-widget-container"><div class="ki-widget-item ki-widget-photo"></div></div><div class="ki-widget-container"><div style="padding-bottom:15px" class="ki-widget-item ki-widget-personal-details"></div></div><div class="ki-widget-hr"></div><div class="ki-widget-container ki-widget-stats" style="padding:15px"></div>')
        var username = parentNode.dataset.username;
        fetchUserDetails(username, "#widget" + i);
    }
}

function appendToWidget(parentSelector, tag, classes, html) {
    var parentNode = document.querySelector(parentSelector);
    var childNode = document.createElement(tag);
    childNode.innerHTML = html;
    childNode.className += classes;
    parentNode.appendChild(childNode);
}

function getJSON(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status === 200) {
            var data = JSON.parse(request.responseText);
            callback(data);
        }
    };
    request.send();
}

function fetchUserDetails(username, widgetId) {
    var url = "https://kitsu.io/api/edge/users?filter[name]=" + username;
    getJSON(url, function (response) {
        updateUserDetails(response, widgetId);
    });
}

function updateUserDetails(user, widgetId) {
    const data = user.data[0];
    if (data.attributes.gender === "secret") data.attributes.gender = "N/A";
    if (data.attributes.gender === "male") data.attributes.gender = "Male";
    if (data.attributes.gender === "female") data.attributes.gender = "Female";
    appendToWidget(widgetId + " .ki-widget-photo", "span", "", '<a target="_blank" href="https://kitsu.io/users/' + data.id + '"><img src="' + data.attributes.avatar.medium + '"></a>');
    appendToWidget(widgetId + " .ki-widget-personal-details", "div", "full-name", data.attributes.name);
    if (data.attributes.about) {appendToWidget(widgetId + " .ki-widget-personal-details", "div", "bio", data.attributes.about);}
    appendToWidget(widgetId + " .ki-widget-stats", "div", "ki-widget-item", '<div class="count">' + data.attributes.followersCount + '</div><div class="stat-name">Followers</div>');
    appendToWidget(widgetId + " .ki-widget-stats", "div", "ki-widget-item", '<div class="count">' + data.attributes.reviewsCount + '</div><div class="stat-name">Reviews</div>');
    appendToWidget(widgetId + " .ki-widget-stats", "div", "ki-widget-item", '<div class="count">' + data.attributes.favoritesCount + '</div><div class="stat-name">Favorites</div>');
    appendToWidget(widgetId + " .ki-widget-stats", "div", "ki-widget-item", '<div class="count">' + data.attributes.mediaReactionsCount + '</div><div class="stat-name">Reactions</div>');
    appendToWidget(widgetId + " .ki-widget-stats", "div", "ki-widget-item", '<div class="count">' + data.attributes.followingCount + '</div><div class="stat-name">Following</div>');
    appendToWidget(widgetId + " .ki-widget-stats", "div", "ki-widget-item", '<div class="count">' + data.attributes.postsCount + '</div><div class="stat-name">Posts</div>');
    appendToWidget(widgetId + " .ki-widget-stats", "div", "ki-widget-item", '<div class="count">' + data.attributes.ratingsCount + '</div><div class="stat-name">Ratings</div>');
    appendToWidget(widgetId + " .ki-widget-stats", "div", "ki-widget-item", '<div class="count">' + data.attributes.commentsCount + '</div><div class="stat-name">Comments</div>');
    appendToWidget(widgetId + " .ki-widget-stats", "div", "ki-widget-item", '<div style="padding-top:10px" class="count">' + data.attributes.location + '</div><div class="stat-name">Location</div>');
    appendToWidget(widgetId + " .ki-widget-stats", "div", "ki-widget-item", '<div style="padding-top:10px" class="count">' + data.attributes.gender + '</div><div class="stat-name">Gender</div>');
}