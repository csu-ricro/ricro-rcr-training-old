/*
	global $
	global navigator
*/

var moduleId = window.location.href.split("#")[1];

// var pageNumber = null;
// if(window.location.href.split("#")[2] != null)
	// pageNumber = window.location.href.split("#")[2].split("-")[1];
// console.log("page: "+pageNumber);

$(document).ready(function(){
	buildNav("dropdown");
	var browser = getBrowserType();
	console.log("User Agent: "+browser);
	if(browser.indexOf("IE")>-1){
		$('#alert-container').html(createAlert("danger","We've detected that you are using an older browser. Some features may not work properly. Please consider using a modern browser such as:"
			+"<ul><li><a href=\"https://www.google.com/chrome/browser/desktop/index.html\"><i class=\"fa fa-chrome\" aria-hidden=\"true\"></i> Google's Chrome</a></li>"
			+"<li><a href=\"https://www.mozilla.org/en-US/firefox/new/\"><i class=\"fa fa-firefox\" aria-hidden=\"true\"></i> Mozilla's Firefox</a></li>"
			+"<li><a href=\"https://www.microsoft.com/en-us/windows/microsoft-edge\"><i class=\"fa fa-edge\" aria-hidden=\"true\"></i> Microsoft's Edge</a></li>"
			+"<li><a href=\"http://www.apple.com/safari/\"><i class=\"fa fa-safari\" aria-hidden=\"true\"></i> Apple's Safari</a></li>"
			+"</ul>"));
		// loadModule(moduleId);
	}
	else
		loadModule(moduleId);
});

function getBrowserType(){
	return navigator.sayswho= (function(){
		var ua= navigator.userAgent, tem,
		M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		if(/trident/i.test(M[1])){
			tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
			return 'IE '+(tem[1] || '');
		}
		if(M[1]=== 'Chrome'){
			tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
			if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
		}
		M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
		if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
		return M.join(' ');
	})();
}

function jsLoad(){
	// console.log("jsonLoad");
	window.scrollTo(0, 0);
	if(window.location.href.split("#").length > 2){
		var page = window.location.href.split("#")[2];
		$('.page-container').attr('style','display:none');
		$('#'+page).attr('style','display:initial');
	}
	
	$('.more').off().on('click',function() {
		$('#more-'+$(this).attr('id')).slideToggle("slow");
	});

	$('.module-btn').off().on('click',function(){
		moduleId = $(this).attr('href').substr(1, $(this).attr('href').length);
		loadModule(moduleId);
	});
	
	$('.pagination-btn').off().on('click',function(){
		var page = $(this).children().attr('href').split('#')[2].split('-')[1];
		// console.log(page);
		$('.page-container').attr('style','display:none');
		$('#page-'+page).attr('style','display:initial');
	});
	
	$('input[type=radio][class=question]').change(function(){
		var id = $(this).attr('name');
		var answer = $(this).attr('value');
		$.ajax({
				type: "get",
				url: "support/json/answers.json",
				dataType: "json",
				cache: false,
				error: function(xhr,status,error) {
					$('#alert-container').html(createAlert("danger","Could not validate answer. Please try again."));
				},
				success: function(json) {
					var questionAlert = createAlert("danger","Question not found in answers! Please report this error.");
					for(var i=0;i<json.length;i++){
						if(json[i].name == id){
							if(json[i].answer == answer)
								questionAlert = createAlert("success","Question answered correctly. You can now move on to the next section!");
							else
								questionAlert = createAlert("warning","Question answered incorrectly. Please try again!");
							break;
						}
					}
					$('#alert-container').html(questionAlert);
				}
		});
	});

	$('input[type=checkbox][class=question]').change(function(){
		var selected = [];
		var id = $(this).attr('name');
		// console.log(id);
		// console.log($('#'+id).children('input:checked'));
		$('#'+id).children('input:checked').each(function() {
			selected.push($(this).attr('value'));
		});
		var answer = $(this).attr('value');
		// console.log(selected);
		$.ajax({
				type: "get",
				url: "support/json/answers.json",
				dataType: "json",
				cache: false,
				error: function(xhr,status,error) {
					$('#alert-container').html(createAlert("danger","Could not validate answer. Please try again."));
				},
				success: function(json) {
					var questionAlert = createAlert("danger","Question not found in answers! Please report this error.");
					for(var i=0;i<json.length;i++){
						if(json[i].name == id){
							if(json[i].answer == answer)
								questionAlert = createAlert("success","Question answered correctly. You can now move on to the next section!");
							else
								questionAlert = createAlert("warning","Question answered incorrectly. Please try again!");
							break;
						}
					}
					$('#alert-container').html(questionAlert);
				}
		});
	});
}

function buildNav(type){
	$.ajax({
		type: "get",
		url: "support/json/modules.json",
		dataType: "json",
		cache: false,
		error: function(xhr,status,error) {
			$('#alert-container').html(createAlert("danger","Could not load data. Please try again."));
			return false;
		},
		success: function(json) {
			var pageData;
			var i;
			for(i=0;i<json.length;i++){
				if(parseInt(json[i].id,10) == moduleId){
					pageData = json[i];
					pageData.pages = parseInt(pageData.pages, 10);
					pageData.id = parseInt(pageData.id, 10);
					break;
				}
			}
			var html = "";
			for(i=0;i<json.length;i++){
				if(json[i].topSeparator == "true" && type=="dropdown")
					html += "<li role=\"separator\" class=\"divider\"></li>";
				
				if(type=="dropdown")
					html +="<li><a class=\"module-btn\" href=\"#"+json[i].id+"\">";
				else if(type=="nav.html")
					html +="<a class=\"list-group-item module-btn\" href=\"#"+json[i].id+"\">";
				
				if(json[i].customModuleHeaderName != null)
					html += json[i].customModuleHeaderName;
				else
					html += "Module "+json[i].id+": "+json[i].name;
				
				if(type=="dropdown")
					html += "</a></li>";	
				else if(type=="nav.html")
					html += "</a>";
				
				if(json[i].bottomSeparator == "true" && type=="dropdown")
					html += "<li role=\"separator\" class=\"divider\"></li>";
			}
			if(type=="dropdown")
				$('#top-module-nav').html(html);
			else if(type=="nav.html")
				$('#module-nav').html(html);
			jsLoad();
			return true;
		}
	});
}

function buildPage(moduleId){
	// console.log("buildPage");
	$.ajax({
		type: "get",
		url: "support/json/modules.json",
		dataType: "json",
		cache: false,
		error: function(xhr,status,error) {
			$('#alert-container').html(createAlert("danger","Could not load data. Please try again."));
		},
		success: function(json) {
			// console.log(json);
			var pageData;
			var i, j;
			for(i=0;i<json.length;i++){
				if(parseInt(json[i].id,10) == moduleId){
					pageData = json[i];
					pageData.pages = parseInt(pageData.pages, 10);
					pageData.id = parseInt(pageData.id, 10);
					break;
				}
			}
			for(j=0; j<pageData.pages;j++){
				var pageNum = j+1;
				var html = "<nav>\n\t<ul class=\"pagination\">\n";
				if(pageData.back == "true" && j==0){
					html += "\t\t<li><a class=\"module-btn\" href=\"#"+(pageData.id-1)+"\" aria-label=\"Previous\">\n"
								+"\t\t\t<span aria-hidden=\"true\"><i class=\"fa fa-angle-double-left\" aria-hidden=\"true\"></i> Back</span></a>\n"
							+"\t\t</li>\n";
				}else if(pageData.back == "false"){
					if(pageData.customBackUrl != null && j==0){
						html += "\t\t<li><a href=\""+pageData.customBackUrl+"\" aria-label=\"Previous\">\n"
									+"\t\t\t<span aria-hidden=\"true\"><i class=\"fa fa-angle-double-left\" aria-hidden=\"true\"></i> Back</span></a>\n"
								+"\t\t</li>\n";
					}else{
						html += "\t\t<li class=\"pagination-btn disabled\"><a href=\"#"+pageData.id+"#page-1\" aria-label=\"Previous\">\n"
									+"\t\t\t<span aria-hidden=\"true\"><i class=\"fa fa-angle-double-left\" aria-hidden=\"true\"></i> Back</span></a>\n"
								+"\t\t</li>\n";
					}
				}else{
					html += "\t\t<li class=\"pagination-btn\"><a href=\"#"+pageData.id+"#page-"+(pageNum-1)+"\" aria-label=\"Previous\">\n"
								+"<span aria-hidden=\"true\"><i class=\"fa fa-angle-double-left\" aria-hidden=\"true\"></i> Back</span></a>\n"
							+"\t\t</li>\n";
				}
				
				for(i=0; i<pageData.pages;i++){
					if((i+1) == pageNum)
						html += "\t\t<li class=\"pagination-btn active\"><a href=\"#"+pageData.id+"#page-"+pageNum+"\">"+pageNum+" <span class=\"sr-only\">(current)</span></a></li>\n";
					else
						html += "\t\t<li class=\"pagination-btn\"><a href=\"#"+pageData.id+"#page-"+(i+1)+"\">"+(i+1)+"</a></li>\n";
				}
				
				if(pageData.next == "true" && j==pageData.pages-1){
					html += "\t\t<li><a class=\"module-btn\" href=\"#"+(pageData.id+1)+"\" aria-label=\"Next\">\n"
								+"\t\t\t<span aria-hidden=\"true\">Next <i class=\"fa fa-angle-double-right\" aria-hidden=\"true\"></i></span></a>\n"
							+"\t\t</li>\n";
				}else if(pageData.next == "false"){
					if(j==pageData.pages-1){
						if(pageData.customNextUrl != null){
							html += "\t\t<li><a href=\""+pageData.customNextUrl+"\" aria-label=\"Next\">\n"
										+"\t\t\t<span aria-hidden=\"true\">Next <i class=\"fa fa-angle-double-right\" aria-hidden=\"true\"></i></span></a>\n"
									+"\t\t</li>\n";
						}else{
							html += "\t\t<li class=\"pagination-btn disabled\"><a href=\"#"+pageData.id+"\" aria-label=\"Next\">\n"
									+"\t\t\t<span aria-hidden=\"true\">Next <i class=\"fa fa-angle-double-right\" aria-hidden=\"true\"></i></span></a>\n"
								+"\t\t</li>\n";
						}
					}else{
						html += "\t\t<li class=\"pagination-btn\"><a href=\"#"+pageData.id+"#page-"+(pageNum+1)+"\" aria-label=\"Next\">\n"
								+"\t\t\t<span aria-hidden=\"true\">Next <i class=\"fa fa-angle-double-right\" aria-hidden=\"true\"></i></span></a>\n"
							+"\t\t</li>\n";
					}
				}else{
					html += "\t\t<li class=\"pagination-btn\"><a href=\"#"+pageData.id+"#page-"+(pageNum+1)+"\" aria-label=\"Next\">\n"
								+"\t\t\t<span aria-hidden=\"true\">Next <i class=\"fa fa-angle-double-right\" aria-hidden=\"true\"></i></span></a>\n"
							+"\t\t</li>\n";
				}
				html += "\t</ul>\n</nav>";
				$('#page-nav-'+(j+1)).html(html);
			}
			if(pageData.customModuleHeaderName != null){
				$('.module-top-header').html(pageData.customModuleHeaderName);
				$('#module-id').html(pageData.name);
				$('#module-name').html("");
			}else{
				$('.module-top-header').html("Module "+pageData.id);
				$('#module-id').html("Module "+pageData.id);
				$('#module-name').html(pageData.name);
			}
			html = "";
			for(i=0;i<json.length;i++){
				if(moduleId == parseInt(json[i].id, 10))
					html += "<a class=\"list-group-item active\" href=\"#"+json[i].id+"\">";
				else
					html += "<a class=\"list-group-item module-btn\" href=\"#"+json[i].id+"\">";
				
				if(json[i].customModuleHeaderName != null)
					html += json[i].customModuleHeaderName;
				else
					html += "Module "+json[i].id+": "+json[i].name;
				html += "</a>\n";
			}
			$('#module-nav').html(html);
			jsLoad();
		}
	});
}

function loadModule(moduleId){
	// console.log('moduleId '+moduleId);
	$.ajax({
		type: "get",
		url: "support/json/modules.json",
		dataType: "json",
		cache: false,
		error: function(xhr,status,error) {
			$('#alert-container').html(createAlert("danger","Could not load data. Please try again."));
		},
		success: function(json) {
			var pageData, i;
			var url = "nav.html";
			for(i=0;i<json.length;i++){
				if(parseInt(json[i].id,10) == moduleId){
					pageData = json[i];
					pageData.pages = parseInt(pageData.pages, 10);
					pageData.id = parseInt(pageData.id, 10);
					break;
				}
			}
			if(pageData != null && moduleId != "")
				url = "modules/"+moduleId+".html";
			
			$.ajax({
				type: "get",
				url: url,
				dataType: "text",
				error: function(xhr,status,error) {
					$('#alert-container').html(createAlert("danger","Could not load page. Please try again."));
				},
				success: function(data) {
					// console.log(data);
					$('#page-body').html(data);
					$('#alert-container').html("");
					if(url == "nav.html"){
						buildNav("nav.html");
					}else
						buildPage(moduleId);
					
				}
			});
		}
	});
}

function createAlert(type, message){
	return "<div class=\"alert alert-"+type+"\">"+message+"</div>\n";
}





// buildTemplateHtml(22);
function buildTemplateHtml(pages){
	var html ="";
	for(var i=12;i<=pages;i++){
		html += "<section class=\"page-container\" id=\"page-"+i+"\">\n"
			+"\t<h1>Page"+i+"</h1>\n"
			+"\t<hr>\n"
			+"\t<div id=\"page-nav-"+i+"\"></div>\n"
		+"</section>\n";
	}
	// console.log(html);
}