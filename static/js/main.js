
var index;

var filterResult;

var galleryCol=0;
var numberCol = 4; //number of columns in the gallery


let createVideoWindow = function(e){
	// let videoLink = e.srcElement.src;
	// videoLink = videoLink.replace("svg","mp4");
	
	let videoLink = '/static/dataset/video/2.mp4'

	
	mw_src.src = videoLink;
	mw_vd.load();

}

let removeFilter = function(e){
	e.srcElement.parentElement.remove();
}


let addFilter = function(e){
	// console.log(e.srcElement)
	let text;
	let li = document.createElement('li');

	if (e.type == "change"){
		if (e.srcElement.value == ""){
			return 
		} else{
			text = document.createTextNode(e.srcElement.value);
		}
		
	} else {
		text = document.createTextNode(e.srcElement.innerText);
	}
	
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
	for (let i=index; i<filterResult['thumbnailsPath'].length && i<index+20; i++){
			let img = new Image();
			// let btn = document.createElement('button');
			let a = document.createElement('a');
			img.src = '/static/dataset/airplane/'+ filterResult['thumbnailsPath'][i];
			a.appendChild(img);
			// a.href = '/static/dataset/airplane/' + data['videoPath'][i];
			// a.type = "button";
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

let fetchVideos = function(e){
	index = 0;

	serverURL = '/fetchVideos/';

	let filters = [];
	for (let i=0; i<fm_fl.childElementCount; i++){
		filters.push(fm_fl.children[i].firstChild.data);
	}
	
	data = JSON.stringify({
		'index':index,
		'data':filters
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
		filterResult = data;
		addGalleryImages();
	})
};



// self-executing function
(function(){
	for (let i=0; i<fm_cat_btn.length; i++){
		fm_cat_btn[i].addEventListener('click', addFilter);
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