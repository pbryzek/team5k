//Number of electoral votes per state
var STATE_ELECTORAL_VOTES = {
    "AZ": 11,
    "FL": 29,
    "NC": 15,
    "PA": 20,
    "WI": 10,
    "MI": 16
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
    let r2_score_str = "R2 Score=" + r2_score + "<br>";
    $('<span />').html(state_str).appendTo(results_div);
    $('<span />').html(sml_param_str).appendTo(results_div);
    $('<span />').html(r2_score_str).appendTo(results_div);

    let img_id = 'img'+i;

    //Get the image file path and append the image
    let file_path = file_dir + "/" + fname;
    append_img(file_path, results_div, img_id);
}

function handle_stats_filename_response(stat, results_div, i){
    let img_id = 'img'+i;
    let span_id = 'span'+i;

    let file_path = stat["file_path"];
    let title = stat["title"];

    append_span(results_div, span_id,title);
    append_img(file_path, results_div, img_id);
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

function build_td(val){
    let td_str = "<td>" + String(val) + "</td>";
    return td_str;
}

const LIGHT_BLUE_HEX = "#ADD8E6";
const LIGHT_RED_HEX = "#FFCCCB";

var rowIdx = 0;
function add_row_to_table(county, predict_blue_votes, predict_red_votes, predict_other_votes, predict_blue_votes_percent, predict_red_votes_percent, predict_other_votes_percent, total_votes_2016, predict_blue_total_votes, predict_red_total_votes, predict_other_total_votes) {
    let color_str = "";
    if (predict_blue_votes > predict_red_votes) {
        color_str = LIGHT_BLUE_HEX;
    } else {
        color_str = LIGHT_RED_HEX;
    }

    let county_td = build_td(county);
    let blue_td = build_td(format_int(predict_blue_votes));
    let red_td = build_td(format_int(predict_red_votes));
    let other_td = build_td(format_int(predict_other_votes));
    let red_percent_td = build_td(format_float(predict_red_votes_percent));
    let blue_percent_td = build_td(format_float(predict_blue_votes_percent));
    let other_percent_td = build_td(format_float(predict_other_votes_percent));
    let total_votes_2016_td = build_td(format_int(total_votes_2016));

    let predict_blue_total_votes_td = build_td(format_int(predict_blue_total_votes));
    let predict_red_total_votes_td = build_td(format_int(predict_red_total_votes));
    let predict_other_total_votes_td = build_td(format_int(predict_other_total_votes));

    let tr_row = '<tr style="background-color:' + color_str + '">';
    tr_row += county_td;
    tr_row += blue_td;
    tr_row += red_td;
    tr_row += other_td;
    tr_row += blue_percent_td;
    tr_row += red_percent_td;
    tr_row += other_percent_td;
    tr_row += total_votes_2016_td;
    tr_row += predict_blue_total_votes_td;
    tr_row += predict_red_total_votes_td;
    tr_row += predict_other_total_votes_td;
    tr_row += "</tr>";

    return tr_row;
}

function add_summary_row_to_table(state, total_blue, total_red, total_other, total_votes, total_red_2016, total_blue_2016, total_other_2016, electoral_votes) {
    let color_str = "";
    if (total_blue > total_red) {
        color_str = LIGHT_BLUE_HEX;
    } else {
        color_str = LIGHT_RED_HEX;
    }

    let state_td = build_td(state);
    let electoral_votes_td = build_td(format_int(electoral_votes));
    let total_blue_td = build_td(format_int(total_blue));
    let total_red_td = build_td(format_int(total_red));
    let total_other_td = build_td(format_int(total_other));
    let total_votes_td = build_td(format_int(total_votes));
    let total_red_2016_td = build_td(format_int(total_red_2016));
    let total_blue_2016_td = build_td(format_int(total_blue_2016));
    let total_other_2016_td = build_td(format_int(total_other_2016));

    let tr_row = '<tr style="background-color:' + color_str + '">';
    tr_row += state_td;
    tr_row += electoral_votes_td;
    tr_row += total_blue_td;
    tr_row += total_red_td;
    tr_row += total_other_td;
    tr_row += total_votes_td;
    tr_row += total_red_2016_td;
    tr_row += total_blue_2016_td;
    tr_row += total_other_2016_td;
    tr_row += "</tr>";

    return tr_row;
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

function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
        val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
}

function clear_stats(){
    $("#total_red").empty();
    $("#total_blue").empty();
    $("#total_other").empty();
    $("#predicted_winner").empty();

    $("#total_blue_2016").empty();
    $("#total_red_2016").empty();
    $("#total_other_2016").empty();
    $("#predicted_winner_2016").empty();

    $("#votes_table_div").empty();
}

function format_int(float_val){
    let int_val = parseInt(float_val);
    let format_val = commaSeparateNumber(int_val);

    return format_val;
}

function format_float(float_val){
    let float_str = parseFloat(float_val).toFixed(2)+"%";
    return float_str;
}

function handle_summary_response(data) {
    let table_votes = "<table>";
    table_votes += "<thead><tr><th>State</th><th>Electoral Votes</th><th>Blue</th><th>Red</th><th>Other</th><th>Total Votes</th><th>Red 2016</th><th>Blue 2016</th><th>Other 2016</th></tr></thead>";

    let stats = data["stats"];
    let total_electoral_red = 0;
    let total_electoral_blue = 0;
    let red_states = 0;
    let blue_states = 0;
    for (let i = 0; i < stats.length; i++) {
        let stat = stats[i];
        let total_blue = stat["total_blue"];
        let total_red = stat["total_red"];
        let total_other = stat["total_other"];
        let total_votes = stat["total_votes"];
        let total_red_2016 = stat["total_red_2016"];
        let total_blue_2016 = stat["total_blue_2016"];
        let total_other_2016 = stat["total_other_2016"];
        let state = stat["state"];

        let electoral_votes = STATE_ELECTORAL_VOTES[state]
        if(total_blue > total_red) {
            total_electoral_blue += electoral_votes;
            blue_states += 1;
        } else {
            total_electoral_red += electoral_votes;
            red_states += 1;
        }

        let tr_row = add_summary_row_to_table(state, total_blue, total_red, total_other, total_votes, total_red_2016, total_blue_2016, total_other_2016, electoral_votes);
        table_votes += tr_row;
    }

    table_votes += "</table>";

    $('#votes_table_div').append(table_votes);

    let red_electoral_str = total_electoral_red.toString();
    let blue_electoral_str = total_electoral_blue.toString();
    let red_str = red_states.toString();
    let blue_str = blue_states.toString();

    $("#red_states").text(red_str);
    $("#blue_states").text(blue_str);
    $("#red_elec_votes").text(red_electoral_str);
    $("#blue_elec_votes").text(blue_electoral_str);
}

function summary_call(ml_url) {
    //Ajax call
    $.ajax({
        type: "GET", url: ml_url,
        success: function (data, text) {
            clear_stats();

            console.log("success");
            console.log(data);

            handle_summary_response(data);
        },
        error: function (request, status, error) {
            console.log("fail");
            alert(request.responseText);
        }
    });
}

function ml_call(ml_url) {
    //Ajax call
    $.ajax({
        type: "GET", url: ml_url,
        success: function (data, text) {
            clear_stats();

            console.log("success");
            console.log(data);

            //Get elements from data
            let ml_type = data["state"];
            let state_dict = data["state_dict"];
            let stats = state_dict["stats"];

            let total_blue_orig = state_dict["total_blue"];
            let total_red_orig = state_dict["total_red"];
            let total_other_orig = state_dict["total_other"];

            let total_blue_2016 = state_dict["total_blue_2016"];
            let total_red_2016 = state_dict["total_red_2016"];
            let total_other_2016 = state_dict["total_other_2016"];

            $("#total_blue_2016").text(format_int(total_blue_2016));
            $("#total_red_2016").text(format_int(total_red_2016));
            $("#total_other_2016").text(format_int(total_other_2016));
            if(total_blue_2016 > total_red_2016) {
                $("#predicted_winner_2016").text("Democrat");
            } else if(total_blue_2016 < total_red_2016) {
                $("#predicted_winner_2016").text("Republican");
            } else {
                $("#predicted_winner_2016").text("Tie!");
            }

            let total_votes = format_int(state_dict["total_votes"]);
            let total_blue = format_int(total_blue_orig);
            let total_red = format_int(total_red_orig);
            let total_other = format_int(total_other_orig);

            if(total_blue_orig > total_red_orig) {
                $("#predicted_winner").text("Democrat");
            } else if(total_blue_orig < total_red_orig) {
                $("#predicted_winner").text("Republican");
            } else {
                $("#predicted_winner").text("Tie!");
            }

            $("#total_red").text(total_red);
            $("#total_blue").text(total_blue);
            $("#total_other").text(total_other);
            $("#total_votes").text(total_votes);

            console.log("ml_type " + ml_type);
            let table_votes = "<table>";
            table_votes += "<thead><tr><th>County</th><th>Predict_Blue</th><th>Predict_Red</th><th>Predict_Other</th><th>Blue %</th><th>Red %</th><th>Other %</th><th>Total_Votes_2016</th><th>Blue Votes</th><th>Red Votes</th><th>Other Votes</th></tr></thead>";
            for (let i = 0; i < stats.length; i++) {
                let stat = stats[i];

                let predict_blue_votes = stat["predict_blue_votes"];
                let predict_red_votes = stat["predict_red_votes"];
                let predict_other_votes = stat["predict_other_votes"];
                let predict_blue_votes_percent = stat["predict_blue_votes_percent"];
                let predict_red_votes_percent = stat["predict_red_votes_percent"];
                let predict_other_votes_percent = stat["predict_other_votes_percent"];
                let total_votes_2016 = stat["total_votes_2016"];
                let county = stat["county"];

                let predict_blue_total_votes = stat["predict_blue_total_votes"];
                let predict_red_total_votes = stat["predict_red_total_votes"];
                let predict_other_total_votes = stat["predict_other_total_votes"];

                let tr_row = add_row_to_table(county, predict_blue_votes, predict_red_votes, predict_other_votes, predict_blue_votes_percent, predict_red_votes_percent, predict_other_votes_percent, total_votes_2016, predict_blue_total_votes, predict_red_total_votes, predict_other_total_votes);
                table_votes += tr_row;
            }

            table_votes += "</table>";
            $('#votes_table_div').append(table_votes);
        },
        error: function (request, status, error) {
            console.log("fail");
            alert(request.responseText);
        }
    });
}

$(document).ready(function () {
    $('#states_summary').hide();
    $('#votes_summary').hide();

    $("#submitBtn").click(function () {
        //Get mltype from the dropdown
        let ml_type = $("#mlType").val();
        //Pass in the ML type to the GET URL
        let ml_url = "/votes/" + ml_type;

        if (ml_type === "Summary") {
            $('#states_summary').show();
            $('#votes_summary').hide();
            summary_call(ml_url);
        } else {
            $('#states_summary').hide();
            $('#votes_summary').show();
            ml_call(ml_url);
        }

        return false;
    });
});
