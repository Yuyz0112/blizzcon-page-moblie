$(function() {
    /*nav-btn*/
    $(".nav-btn").click(function() {
        if ($(".ui-navbar").css("display") == "none") {
            console.log("hide");
            $(".ui-navbar").show(200);
        } else {
            $(".ui-navbar").hide(200);
        }
    });
    /*share-btn*/
    $(".share").click(function() {
        if ($(".share-group").css("display") == "none") {
            $(".share-group").show(200);
        } else {
            $(".share-group").hide(200);
        }
    });

    /*adjust height*/
    var slidewidth = $(".swiper-container").width();
    $(".swiper-container").css("height", 0.6 * slidewidth);
    $(".stream").css("height", $(window).height());


    /*back-to-top*/
    $(".top-btn").click(function() {
        $("html,body").stop().animate({
            scrollTop: 0
        }, 1000);
    })
})

$(document).on("pagebeforecreate", function(event) {
    var u = navigator.userAgent;
    if (u.indexOf("UCBrowser") != -1) {
        console.log($("#uc").attr("data-position"));
        $(".uc").removeAttr("data-position");
    };
});
$(document).on("pagebeforehide", function(event) {
    $(".ui-navbar").hide();
    $(".mpage").each(function() {
        if ($(this).css("display") != "none") {
            var pagename = $(this).attr("id");
            switch (pagename) {
                case "pageone":
                    clickcache[0] = count;
                    break;
                case "pagefour":
                    clickcache[1] = count;
                    break;
                case "pagefive":
                    clickcache[2] = count;
                    break;
            }
        }
    })
    console.log(clickcache);
});
$(document).on("pageshow", function() {

        //alert("???");
        $(".mpage").each(function() {
            if ($(this).css("display") != "none") {
                var pagename = $(this).attr("id");
                switch (pagename) {
                    case "pageone":
                        count = clickcache[0];
                        break;
                    case "pagefour":
                        count = clickcache[1];
                        break;
                    case "pagefive":
                        count = clickcache[2];
                        break;
                }
            }
        })

});

/*ajax*/
var count = 0,
    repo;
var clickcache = [0,0,0];

function morelist(content, addnum, listname, btnname, classname) {
    console.log(count, repo, clickcache);
    if (count == -1) {
        return false;
    } else {
        repo = count;
        count = -1;
        $(document).ready(function() {
            bodyContent = $.ajax({
                url: "ajax/slider.html",
                contentType: "application/x-www-form-urlencoded; charset=gb2312",
                global: false,
                type: "GET",
                dataType: "html",
                async: true,
                success: function(data) {
                    count = repo;
                    count++;
                    var addpart = "";
                    for (var i = addnum * count; i < addnum * (count + 1); i++) {
                        if ($($(data).find(content).get(i)).html() == undefined) {
                            count = -1;
                            break;
                        };
                        addpart = addpart + "<li class=" + classname + ">" + $($(data).find(content).get(i)).html(); + "</li>";
                    }
                    var originpart = $(listname).html();
                    originpart += addpart;
                    $(listname).html(originpart);
                    if (count == -1) {
                        $(btnname).html("º”‘ÿÕÍ±œ");
                    }
                }
            })
        })
    }
}