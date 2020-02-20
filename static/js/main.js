
var index;

var filterResult;

var galleryCol=0;
var numberCol = 3; //number of columns in the gallery

var categories = []

let createVideoWindow = function(e){
	let videoLink = e.srcElement.src;
	videoLink = videoLink.replace("jpg","mp4");
	
	// let videoLink = '/static/dataset/video/2.mp4'

	mw_src.src = videoLink;
	mw_vd.load();

}

let removeFilter = function(e){
	e.srcElement.parentElement.remove();
}


let addFilter = function(e){
	// console.log(e.srcElement)
	let text = document.createTextNode(e.srcElement.value);

	if (e.type == "change"){
		if (categories.indexOf(e.srcElement.value) == -1){
			return 
		} else{
			text = document.createTextNode(e.srcElement.value);
		}
	} else {
		text = document.createTextNode(e.srcElement.value);
	}

	let currentFilters = document.querySelectorAll("#fm-fl li");
	for (let j=0; j<currentFilters.length; j++){
		if (text.data == currentFilters[j].firstChild.data) {
			return
		}	
	}

	
	let li = document.createElement('li');
	let a = document.createElement('a');
	a.innerText = 'x';
	a.classList = 'close';
	// a.href = "";
	a.addEventListener('click', removeFilter);

	li.appendChild(text);
	li.appendChild(a);
	fm_fl.appendChild(li);
};


let addGalleryImages = function(){


	if(filterResult.length == 0){
		let p = document.createElement('p');
		p.innerText = "No results";
		gallery[1].appendChild(p);		
	} else{
		for (let i=index; i<filterResult.length && i<index+20; i++){
		let img = new Image();
		let a = document.createElement('a');

		img.src = '/static/dataset/'+ filterResult[i] + '.jpg';
		// img.style.padding = "1px";
		img.classList.value = "p-1 img-fluid";
		a.appendChild(img);
		a.setAttribute("data-toggle","modal");
		a.setAttribute("data-target", "#mw");
		a.addEventListener('click', createVideoWindow);
		gallery[galleryCol].appendChild(a);

		if (galleryCol<numberCol){
			galleryCol+=1;
		} else{
			galleryCol=0;
		}
	}

		index+=20;
	}


}

let fetchVideos = function(e){
	index = 0;

	serverURL = '/fetchVideos/';

	if(fm_fl.childElementCount <= 0){
		alert("Select filters");
	}

	let filters = [];
	for (let i=0; i<fm_fl.childElementCount; i++){
		filters.push(fm_fl.children[i].firstChild.data);
	}
	
	data = JSON.stringify({
		'filters':filters
	});

	fetch(serverURL, {
		method: "POST",
		header: {
			'Content-Type': 'application/json',
		},
		body: data
	}).then(function(response){
		return response.json();
	}).then(function(data){
		filterResult = data['videoName'];
		for (let i=0; i<= numberCol; i++){
		gallery[i].innerHTML = "";
		}
		galleryCol = 0;
		addGalleryImages();
	})
};



// self-executing function
(function(){
	
	

	for (let i=0; i<fm_cat_btn.length; i++){
		fm_cat_btn[i].addEventListener('click', addFilter);
		// fm_cat_dl[i].addEventListener('click', addFilter);
		categories.push(fm_cat_btn[i].value);
	}

	fm_tb.addEventListener('change', addFilter);





})();




// Event listeners

fm_search.addEventListener('click', fetchVideos);


window.addEventListener('scroll', function(e){
	if(window.scrollY + window.innerWidth >= document.body.scrollHeight){
		// console.log(window.scrollY, window.outerWidth, document.body.scrollHeight)
		addGalleryImages();
	}
});