const ML_TYPE_LR = "Linear_Regression";
const ML_TYPE_LOG = "Logistic_Regression";
const ML_TYPE_RF = "Random_Forest";
const ML_TYPE_DT = "Decision_Tree";
const ML_TYPE_US = "Unsupervised";
const ML_TYPE_COUNTY = "Stats_Counties";
const ML_TYPE_STATS_DONATIONS = "Stats_Donations";
const ML_TYPE_STATS_VOTES = "Stats_Votes";

var mlType_dir_dict = {
    "Linear_Regression": "linear_regression",
    "Random_Forest": "random_forest",
    "Decision_Tree": "decision_tree",
    "Logistic_Regression": "logistic_regression",
    "Unsupervised": "unsupervised_ml",
    "Stats_Counties": "county_cluster",
    "Stats_Donations": "stats_donation",
    "Stats_Votes": "stats_votes"
};

function append_span(results_div, span_id, str){
    $('<span />').html(str).appendTo(results_div);
}

function append_img(file_path, results_div, img_id){
    $('<img />').attr({
        'id': img_id,
        'src': file_path,
        'width': "100%",
        'height': "100%"
    }).appendTo(results_div);
}
function handle_lr_response(results_div, stat, file_dir, i){
    let fname = stat["file_name"];
    let state = stat["state"];
    let sml_param = stat["sml_param"];
    let r2_score = stat["r2_score"];

    let state_str = "State=" + state + "<br>";
    let sml_param_str = "SML Param=" + sml_param + "<br>";
    //let r2_score_str = "R2 Score=" + r2_score + "<br>";
    $('<span />').html(state_str).appendTo(results_div);
    $('<span />').html(sml_param_str).appendTo(results_div);
    //$('<span />').html(r2_score_str).appendTo(results_div);

    let img_id = 'img'+i;

    //Get the image file path and append the image
    let file_path = file_dir + "/" + fname;
    append_img(file_path, results_div, img_id);
}

function handle_stats_filename_response(stat, results_div, i){
    let img_id = 'img'+i;
    let file_path = stat["file_path"];
    console.log(file_path);
    append_img(file_path, results_div, img_id);
}

function handle_stats_filename_response2(stat, results_div, i){
    let img_id = 'img'+i;
    let span_id = 'span'+i;

    let file_path = stat["file_path"];
    let title = stat["title"];

    append_span(results_div, span_id,title);
    append_img(file_path, results_div, img_id);
}

function handle_us_response(stat, results_div, i){
    handle_stats_filename_response(stat, results_div, i);
}

function handle_stats_don_response(stat, results_div, i){
    handle_stats_filename_response(stat, results_div, i);
}

function handle_stats_votes_response(stat, results_div, i){
    handle_stats_filename_response(stat, results_div, i);
}

function handle_stats_counties_response(stat, results_div, i){
    handle_stats_filename_response(stat, results_div, i);
}

function handle_log_response(results_div, stat, file_dir, i){
    let accuracy = stat["accuracy"];
    let recall = stat["recall"];
    let precision = stat["precision"];
    let f1 = stat["f1"];
    let sml_param = stat["sml_param"];
    let state = stat["state"];
    let fname = stat["file_name"];

    let acc_str = "Accuracy=" + accuracy + "<br>";
    let recall_str = "Recall=" + recall + "<br>";
    let precision_str = "Precision=" + precision + "<br>";
    let f1_str = "F1=" + f1 + "<br>";
    let sml_param_str = "SML Param=" + sml_param + "<br>";
    let state_str = "State=" + state + "<br>";

    $('<span />').html(state_str).appendTo(results_div);
    $('<span />').html(sml_param_str).appendTo(results_div);
    $('<span />').html(acc_str).appendTo(results_div);
    $('<span />').html(recall_str).appendTo(results_div);
    $('<span />').html(precision_str).appendTo(results_div);
    $('<span />').html(f1_str).appendTo(results_div);

    let img_id = 'img'+i;
    //Get the image file path and append the image
    let file_path = file_dir + "/" + fname;
    append_img(file_path, results_div, img_id);
}

$(document).ready(function () {
    $("#submitBtn").click(function () {
        //Get mltype from the dropdown
        let ml_type = $("#mlType").val();
        //Pass in the ML type to the GET URL
        let ml_url = "/ml/" + ml_type;
        //Ajax call
        $.ajax({
            type: "GET", url: ml_url,
            success: function (data, text) {
                console.log("success");
                console.log(data);
                //Get elements from data
                let ml_type = data["ml_type"];
                let stats = data["stats"];

                //Get the div columns to add image grid to
                let results_div_col1 = $("#results_images_col1");
                let results_div_col2 = $("#results_images_col2");
                $("#results_images_col1").empty();
                $("#results_images_col2").empty();

                console.log("ml_type " + ml_type);
                console.log(stats);
                for (let i = 0; i < stats.length; i++) {
                    let stat = stats[i];
                    var results_div;
                    if (i % 2 === 0) {
                        results_div = results_div_col1;
                    } else {
                        results_div = results_div_col2;
                    }
                    let model_dir = mlType_dir_dict[ml_type];
                    let file_dir = "./static/img/" + model_dir;
                    
                    if(ml_type == ML_TYPE_LR) {
                        //handle_lr_response(results_div, stat, file_dir, i);
                        handle_stats_votes_response(stat, results_div, i);
                    } else if(ml_type == ML_TYPE_LOG) {
                        handle_log_response(results_div, stat, file_dir, i);
                    } else if(ml_type == ML_TYPE_RF) {
                        //handle_log_response(results_div, stat, file_dir, i);
                        handle_stats_votes_response(stat, results_div, i);
                    } else if(ml_type == ML_TYPE_DT) {
                        handle_stats_votes_response(stat, results_div, i);
                    } else if(ml_type == ML_TYPE_US) {
                        //handle_us_response(stat, results_div, i);
                        handle_stats_votes_response(stat, results_div, i);
                    } else if(ml_type == ML_TYPE_STATS_DONATIONS) {
                        handle_stats_don_response(stat, results_div, i);
                    } else if(ml_type == ML_TYPE_STATS_VOTES) {
                        handle_stats_votes_response(stat, results_div, i);
                    } else if(ml_type == ML_TYPE_COUNTY) {
                        handle_stats_counties_response(stat, results_div, i);
                    } else if(ml_type == ML_TYPE_VOTES) {
                        handle_stats_filename_response2(stat, results_div, i);
                    }
                }
            },
            error: function (request, status, error) {
                console.log("fail");
                alert(request.responseText);
            }
        });
        return false;
    });
});
