"use strict";

function clear() {
	for (let i = 0; i < timeouts.length; i++)
		clearTimeout(timeouts[i]);

	timeouts = [];
	clearInterval(my_interval);
	delete_grid();

	// if (window.innerWidth > menu_width + 50) {
		init_css_properties_before();
		generate_grid();
		init_css_properties_after();
		visualizer_event_listeners();
	// }
}

function menu_event_listeners() {
	document.querySelector("#randomize_btn").addEventListener('click', event => {
		if (solving)
			return;
		maze_generators();
	});

	document.querySelector("#clear").addEventListener('click', event => {
		if (solving)
			return;
		let start_temp = start_pos;
		let target_temp = target_pos;
		clear();
		place_to_cell(start_pos[0], start_pos[1]).classList.remove("start");
		place_to_cell(start_temp[0], start_temp[1]).classList.add("start");
		place_to_cell(target_pos[0], target_pos[1]).classList.remove("target");
		place_to_cell(target_temp[0], target_temp[1]).classList.add("target");
		start_pos = start_temp;
		target_pos = target_temp;
	});

	document.querySelector("#play").addEventListener('click', event => {
		if (generating || solving)
			return;
		generating = false;
		clear_grid();
		maze_solvers();
	});
}
