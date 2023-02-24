function get_html_info_result_loading(description, id) {
	let html = `
		<div class="bloc-line" id="${id}">
            <div class="border-2 info-result p-0 pb-2 d-flex flex-column bg-3">
                <div class="info-result-head bg-2 text-center p-1 text-light font-1">
                    ${description}
                </div>
                <div class="d-flex justify-content-center py-2 loading-bloc-body">
                    <div class="spinner-border spinner-border-sm text-light" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
	`
	return html
}

function get_html_error_loading() {
	let html = `
		<p class="text-2 m-0 h6 text-center">Aïe. Une erreur s'est produite <i class="fa-solid fa-face-sad-tear"></i></p>
	`
	return html
}

function get_html_error_from_request(text) {
	let html = `
		<p class="text-2 m-0 h6 text-center">${text}</p>
	`
	return html
}

function get_html_bloc_images(data) {
	let sd_html = ''
	for (url of data.stable_diffusion) {
		let url_html = `
			<div class="p-1 img-res-container col">
                <img src="${url.url}" alt="">
            </div>
		`
		sd_html += url_html
	}

	let d_html = ''
	for (url of data.dall_e) {
		let url_html = `
			<div class="p-1 img-res-container col">
                <img src="${url.url}" alt="">
            </div>
		`
		d_html += url_html
	}

	let html = `
		<div class="info-result-body row">
            <div class="col-md-6 p-2 d-flex flex-column align-items-center">
                <p class="m-0 px-2"><span class="ia-badge bg-4">Stable Diffusion</span></p>
                <div class="row m-1 bg-4">
                    ${sd_html}
                </div>
            </div>

            <div class="col-md-6 p-2 d-flex flex-column align-items-center">
                <p class="m-0 px-2"><span class="ia-badge bg-5">Dall-E 2</span></p>
                <div class="row m-1 bg-5">
                    ${d_html}
                </div>
            </div>
        </div>
        <div class="info-result-foot">
            <p class="m-0 text-center text-click-on-pic text-2">Cliquez sur une image pour la voir de plus près</p>
        </div>
    </div>
	`
	return html
}

function get_home_error_loading() {
	let html = `
		<div class="svg-container-1 svg-container-loading">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M459.1 52.4L442.6 6.5C440.7 2.6 436.5 0 432.1 0s-8.5 2.6-10.4 6.5L405.2 52.4l-46 16.8c-4.3 1.6-7.3 5.9-7.2 10.4c0 4.5 3 8.7 7.2 10.2l45.7 16.8 16.8 45.8c1.5 4.4 5.8 7.5 10.4 7.5s8.9-3.1 10.4-7.5l16.5-45.8 45.7-16.8c4.2-1.5 7.2-5.7 7.2-10.2c0-4.6-3-8.9-7.2-10.4L459.1 52.4zm-132.4 53c-12.5-12.5-32.8-12.5-45.3 0l-2.9 2.9C256.5 100.3 232.7 96 208 96C93.1 96 0 189.1 0 304S93.1 512 208 512s208-93.1 208-208c0-24.7-4.3-48.5-12.2-70.5l2.9-2.9c12.5-12.5 12.5-32.8 0-45.3l-80-80zM200 192c-57.4 0-104 46.6-104 104v8c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8c0-75.1 60.9-136 136-136h8c8.8 0 16 7.2 16 16s-7.2 16-16 16h-8z"/></svg>
        </div>
        <p class="text-1 text-center fw-bold my-2">Oups une erreur s'est produite</p>
	`
	return html
}