$(document).ready(function ($) {
    getFeedback();
    getSummary();
    //Get Feedback.. This function will shows all feedback which are submitted by users
    function getFeedback() {              
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/comments',
                dataType: "JSON",
                cache: false,
                headers: {
                    "Content-Type": "application/json",                  
                },
                success: function (response) {
                    var divcomm = $("#allFeedback").empty();
                    $.each(response, function (name, val) {
                        var feedUsername = val.username;
                        var userTextColor = "#337ab7";                                           
                        var textval = $('<div class="media"><div class="media-body"><h4 class="media-heading"><label style="color: ' + userTextColor + ';">' + feedUsername + '</label> on <span>' + val.dateTime + '</span></h4>' + val.feedbackText + '</div></div><hr>').appendTo(divcomm);
                    });
                },
                error: function (xhr, status, error) {
                    iziToast.error({
                        title: 'Error',
                        message: 'Error while submitting your request',
                    });
                }
            });        
    }
    //Get Feedback Summary. This function will shows feedback summary which are submitted by users
    function getSummary() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/summary',
            dataType: "JSON",
            cache: false,
            headers: {
                "Content-Type": "application/json",
            },
            success: function (response) {
                var divcomm = $("#feedbackSummary").empty();
                $.each(response, function (name, val) {                    
                    allCounts.append(' <li><strong>' + val.topic + '</strong> ' + val.totalCount + '</li>');                                      
                });
            },
            error: function (xhr, status, error) {
                iziToast.error({
                    title: 'Error',
                    message: 'Error while submitting your request',
                });
            }
        });
    }
    //Save Users Feedback in db
    function submitFeedback() {
        $("#validateDiv").empty();
        var userEmail = $("#Email").val();
        var questTopic = $("#Topic").val();
        var userFeedback = $("#feedbackText").val();
        var feedback = new FormData();
        feedback.append('email', $userEmail.val());
        feedback.append('topic', $questTopic.val());
        feedback.append('feedbackText', $userFeedback.val());

        //Ajax call to the backend API
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/feedback',
            cache: false,
            data: JSON.stringify(feedback),
            processData: false,
            contentType: false,
            success: function (response) {
                iziToast.success({
                    title: 'OK',
                    message: 'Feedback Successfully Added!',
                });
                //show current submitted feedback //response will return the user detail like usename,date time etc
                //we can also get all data and only refresh the feedback div 
                //But in my implementation i just append newly added feedback
                var divcomments = $("#allFeedback");
                $.each(response, function (name, val) {
                    var username = val.username;
                    var userTextColor = "#337ab7";
                    var textvale = $('<div class="media"><div class="media-body"><h4 class="media-heading"><label style="color: ' + userTextColor + ';">' + username + '</label> on <span>' + val.dateTime + '</span></h4>' + val.feedbackText + '</div></div><hr>').appendTo(divcomments);
                });
                // Clear the textboxes
                $("#Email").val('');
                $("#Topic").val('');
                $("#feedbackText").val('');
            },
            error: function (xhr, status, error) {
                //server side validation it will shows validation errors etc
                var jsonResponseText = $.parseJSON(xhr.responseText);
                var count = 0;
                $.each(jsonResponseText, function (name, val) {
                    if (name == "errors") {
                        $('#validateDiv').append('Validation error(s)');
                        $.each(val, function (index, value) {
                            count++;
                            $('#validateDiv').append('</br> ' + count + '. ' + value);
                        });
                        $("#validateDiv").show();
                        $('#validateDiv').delay(5000).fadeOut('slow');
                        $(function () {
                            setTimeout(function () {
                                $("#validateDiv").hide('blind', {}, 500)
                            }, 5000);
                        });
                    }
                });
            }
        });
        return false;
    }

});