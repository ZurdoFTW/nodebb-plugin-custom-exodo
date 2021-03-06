/**
 * TODO:
 *	- Intentar que se cargue antes, ya sea por hook o desde servidor
 * 	- A parte de añadir más personalizaciones, intentar, con más tiempo, enfocarlo de otra manera, que cada una sea independiente y cada una sea la que decida como debe aplicarse y cuales son sus opciones en el formulario de edición.
 */
 //var BACKGROUND_PROPERTY = 'linear-gradient(transparent, #F6F6F6), url("{url}") center center / cover transparent';
 var user_options = {

		brandColor: '',
		//headerImage: '',
		//hideTitle: false,
    usecode: false,
    custom: false,
 };

(function () {

	/* Este el único hook que he encontrado que se ejecuta lo suficientemente pronto sin pasarse, pero es genérico, por lo que comprobamos que estamos dentro de un Topic */
	$(window).on('action:ajaxify.contentLoaded', function () {


	/*	socket.emit('modules.test', {data: "Some data"}, function(err, result) {
    alert(result);
		});
*/

		// Siempre cargamos la personalizacion del usuario, si el topic tiene una porpia la sobreescribira luego
		loadUserStorage();

		//init for topic personaliation
		//if ($('.topic').length){
		//	init();
		//}
		if(!$("#nav_personalize").length)
		{

			var $button = $('<li id="nav_personalize" class="hidden-xs"><a href="#"><i class="fa fa-paint-brush"></i><span> Personalizar</span></a></li>');
			//var $homebutton = $('<a href="#" id="home_personalize" class="btn btn-primary"><i class="fa fa-paint-brush"></i><span> Personalizar</span></a>');
			$button.insertBefore($("[component='user/logout']"));
			//$homebutton.insertBefore($("#new_topic"));

			$button.click(function () {
				openUserCustomizeWindow();
			});
			/*$homebutton.click(function () {
				openUserCustomizeWindow(options);
			});*/
			getUserCustomization();  //lo hace dos veces?
		}
	});


	//load user options from localStorage
	function loadUserStorage()
	{
		if(!localStorage.userCustomization)
		{
		    getUserCustomization();
		}
		else
		{
			if ( JSON.parse(localStorage.userCustomization) !== undefined) {
				user_options = JSON.parse(localStorage.userCustomization);
			}
			//aplicamos en el tema
			setUserCustomization();
		}
	}


//aplica la customizacion del usuario en el theme
	function setUserCustomization() {

		$('.topic').addClass('custom-topic');
		/* Inyectamos estilos */
		$('#custom-topic-style').remove();
		var style = document.createElement('style');
		style.type = 'text/css';
		style.id = 'custom-topic-style';

		/* Reemplazamos todos los elementos que tengan el color del tema por defecto */
		if (user_options.brandColor && user_options.brandColor.match(/^(#\w{3,6}|[a-z]+)$/i)) {
			// Elementos de un topic
			//style.textContent += '.custom-topic .post-row .post-header {background: {color}; border-color: {color};}';
			//style.textContent += '.custom-topic a {color: {color}}';
			//style.textContent += '.custom-topic .username-field {color: {textcolor} !important}';
			//style.textContent += '.custom-topic .btn-exodo .exright {background: {color}}';
			//style.textContent += '.custom-topic .pagination > .active > a {background: {color}; border-color: {color}; color: white; }';
			//style.textContent += '.custom-topic .pagination a, .custom-topic .pagination a:hover {color: {color};}';
			//style.textContent += '.ribbon-green a {color: white}';

			// Elementos del resto del foro
			if(localStorage.userCustomization)
			{
				// Gradiente linear-gradient(to right, {color} 0px, {color2} 100%)
				//style.textContent += '.btn-exodo .exright {background: {color}}';
				//style.textContent += '.loading-bar {background: linear-gradient(to right, {color} 0px, {color2} 100%)}';

				// headers con degradados
				//style.textContent += '.category .category-topics .category-item .topic-row .threadinfo>small a {color: {color}}';
				//style.textContent += '.category .category-topics .category-item .topic-row .threadlastpost a.lastpost {color: {color}}';


				//style.textContent += '.category .category-head .category-head-top h1 {color: {color}}';

				//style.textContent += '.ribbon-green a {color: white}';
        /*style.textContent += 'p {font-family: {fontfamily}}';
        style.textContent += 'a {font-family: {fontfamily}}';
        style.textContent += 'i {font-family: {fontfamily}}';*/

        //A PARTIR DE aqui!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        //body font
        style.textContent += 'body {font-family: {fontfamily};}';
        //style.textContent += '.category>ul>li .content h2 a, .category .stats, .categories .stats, .teaser , .tag-item, .category .category-bar, .categories-bar p, .categories>li .content h2 a, .account>.row {font-size: {fontsize}px;}';

        //bg forum
        style.textContent += 'body {background: {backgroundforo};}';

        //bg post left and rear bg
        style.textContent += '.topic .posts .post-details {background: {backgroundpostbox};}';
        style.textContent += '.topic .posts .box {background: {backgroundpostbox};}';

        //bg post content and subcontent
        style.textContent +=  '.topic .content, .topic .sub-content  { background-color: {backgroundtextbox};}';

        //bg post linksbar
        style.textContent += '.topic .posts .links-bar small {background: {backgroundpostbar};}';

        //bg post list
        style.textContent += '.category > ul > li, .categories >li {background-color: {backgroundpostlist};}';

        style.textContent += '.panel-body {background: {backgroundpostlist}}';  //groups list bg and homepage panels
        style.textContent += '.category-item.pinned .topic-row {background: {backgroundpostlist}}';
        style.textContent += '.category .category-topics .threadlisthead .category-item .topic-row {background: {backgroundpostlist};}';


        //bg modal
        style.textContent += '.modal-content{ background-color: {backgroundmodal};}';

        //composer
        style.textContent += '.composer .write , .composer .preview {background-color: {backgroundcomposer2};}';
        style.textContent += '.composer { background-color: {backgroundcomposer1};}';
        style.textContent += ' html.composing .composer .composer-container { background: {backgroundcomposer1};}';
        style.textContent +=  '.composer .formatting-bar .formatting-group li { color: {composericonscolor};} ';
        style.textContent +=  '.composer .formatting-bar .formatting-group li { color: {composericonscolor};} ';
        style.textContent += '.composer .tags-container .bootstrap-tagsinput input { color: {color};}';

        //buttons
        style.textContent += '.btn-default, .btn-primary, .btn-danger, .btn-info, .btn-warning {border-left: 5px solid {borderbutton} !important;}';
        style.textContent += '.btn-default, .btn-primary, .btn-danger, .btn-info, .btn-warning {background-color: {backgroundbutton} !important;}';
        style.textContent += '.btn-default, .btn-primary, .btn-danger, .btn-info, .btn-warning, .btn-primary:active, .btn-default:focus, .btn-primary:focus, .open > .dropdown-toggle.btn-default  {color: {textbutton}}';
        style.textContent += '.btn-default:hover, .btn-primary:hover, .btn-danger:hover, .btn-info:hover, .btn-warning:hover {color: {hoverbutton} !important}';

        //link forum
        style.textContent += 'body a {color: {color}}';
        //style.textContent += '.category a:hover, .category a:focus, .topic .content a:focus, .topic .content a:hover, .topic .sub-content a:focus, .topic .sub-content a:hover, .categories a:hover, .categories a:focus {color: {hoverlink} !important;}'; //falta añadir muchos mas
        style.textContent += ' a:hover, a:focus , a:active {color: {hoverlink};}';

        //link post box
        style.textContent += '.box a {color: {postlink};}';
        style.textContent += '.box a.permalink {color: {postlink};}';
        style.textContent += '.box a.permalink:hover, .box a.permalink:focus, .box a.permalink:active {color: {posthover};}';
        style.textContent += '.box a:hover, .box a:focus, .box a:active {color: {posthover};}';

        //text forum
        style.textContent += 'body {color: {textcolor}}';

        //text alternativeColor
          style.textContent += '.breadcrumb>.active {color: {alternativecolor};}';
        //text postlist
        style.textContent += '.posts-list .posts-list-item .topic-title { color: {textcolor}}';

        //text topiclist and categories
        style.textContent += '.category>ul>li:not(.unread) h2 div a { color: {listcolor};}';
        style.textContent += '.category>ul>li:not(.unread) h2 a {color: {listcolor2};}';
        style.textContent += '.category>ul>li.unread h2 small a { color: {listcolor2};}';
        style.textContent += '.category>ul>li.unread h2 div a { color: {unreadlistcolor};}';
        style.textContent += '.categories>li h2 a, .categories>li h2 .category-children a small { color: {listcolor};}';
        style.textContent += '.categories>li h2 a:hover, .categories>li h2 .category-children a:hover small { color: {unreadlistcolor} !important;}';
        style.textContent += '.categories>li h2 .description { color: {listcolor2} !important;}';
        style.textContent += '.categories .stats, .category .stats { color: {listcolor2};}';
        style.textContent += '.categories .stats small, .category .stats small { color: {smalllistcolor};}';
        style.textContent += '.category>ul>li.unread h2 small span.timeago { color: {smalllistcolor};}';
        style.textContent += '.category>ul:not(.unread)  h2 small span.timeago { color: {smalllistcolor};}';
        style.textContent += 'a.permalink, a.permalink:hover, a.permalink:focus, a.permalink:active {color: {smalllistcolor};}';

        style.textContent += '.category>ul>li:not(.unread) h2 a:hover {color: {unreadlistcolor};}';
        style.textContent += '.category>ul>li.unread h2 div a:hover { color: {listcolor};}';
        style.textContent += '.category>ul>li.unread h2 small a:hover { color: {unreadlistcolor};}';
        style.textContent += '.categories .card .post-content, .category .card p { color: {listcolor2};}';

        //text post content and subcontent
        style.textContent +=  '.topic .content, .topic .sub-content  { color: {postcolor};}';
        //text post linkbar
        style.textContent += '.links-bar a, .links-bar { color: {linksbarcolor} !important;}';
        //text post-details
        style.textContent += '.topic .post-details { color: {postdetailscolor}}';

        //post lines
        style.textContent += '.topic .content hr { border-top: 1px solid {postcolor};}';

        //text barra titulos
        style.textContent += '.panel-default > .panel-heading {color: {color3};}';
        style.textContent += '.category .category-bar p, .categories-bar p {color:{color3};}';
        style.textContent += '.topic .posts .post-header .username a, .topic .index  {color:{color3};}';

        //dropdowns and notification-list
        style.textContent +=  '.dropdown-menu { background-color: {backgrounddropdown};}';
		    style.textContent +=  '#menu .notification-list li.unread, .header .notification-list li.unread { background-color: {backgrounddropdown};}'; //meterlo en el futuro como opcion
		    style.textContent +=  '.dropdown-menu li a { color: {dropdowncolor} !important;}';
		    style.textContent +=  '.dropdown-menu li ul li a, .chats-list{ color: {dropdowncolor} !important;}';

        //pills
        style.textContent += '.nav>li>a:hover, .nav>li>a:focus {background-color: {backgroundpostlist};}';
        style.textContent += '.nav-pills>li.active>a, .nav-pills>li.active>a:hover, .nav-pills>li.active>a:focus {background: {color};}';
        //chats list
        style.textContent += '.chats-list li {background: {backgroundpostlist};}';

        //pagination
        style.textContent += '.pagination>.active>a, .pagination>.active>span, .pagination>.active>a:hover, .pagination>.active>span:hover, .pagination>.active>a:focus, .pagination>.active>span:focus {background-color: {paginationcolor};border-color: {paginationcolor};}';
        style.textContent += '.pagination>li>a , .pagination>li>a:hover, .pagination>li>span:hover, .pagination>li>a:focus, .pagination>li>span:focus, .pagination>.disabled>a {color: {paginationcolor};}';
        style.textContent += '.pagination>li>a, .pagination>.disabled>a { background-color: {backgroundpagination};}';

        //form-control
				style.textContent += '.form-control, .bootstrap-tagsinput {background-color: {backgroundform} !important;}';
        style.textContent += '.form-control {color: {formcolor} !important;}';

        //well
        style.textContent += '.well, .list-group-item {background-color: {backgroundwell};}';

        //ignore
        style.textContent += '.users-container {background: {backgroundpostlist};}';

        //tags
				style.textContent += '.tag-topic-count {background: {tagcolor2}; border-color: {tagcolor2};}';
				style.textContent += '.tag-item {background: {tagcolor1}; border-color: {tagcolor1};}';

        //barra de titulos
        style.textContent += '.panel-default > .panel-heading {background: {color2};}';
        style.textContent += '.category .category-bar, .categories-bar p {background:{color2};}';
        style.textContent += '.topic .posts .post-header {background:{color2};}';
        //style.textContent += '.custom-topic .post-row .post-header {background:{color2};}';

        //borders topiclist and categories
        style.textContent += '.categories>li, .category>ul>li {border-top: 1px solid {bordertopiclist} !important; border-left: 0px; border-right: 0px;}';
        style.textContent += '.categories>li:last-child, .category>ul>li:last-child { border-bottom: 0px !important; }';


        //removing borders
        style.textContent += '.pagination>li>a {border: 0;}';
        style.textContent += '.topic .box { border: 0; } .topic .posts .links-bar { border: 0;}';
        style.textContent += '.panel { border: 0;}';
        style.textContent += '.navbar-default {border: 0;}';
        style.textContent += 'hr {border-top: 0;}';
        style.textContent += '.composer .write , .composer .preview {border: 0;}';
        style.textContent += '.well, .list-group-item{border: 0;}';

			}

			style.textContent = style.textContent.replace(/\{color\}/g, user_options.brandColor);
			style.textContent = style.textContent.replace(/\{color2\}/g, user_options.brandColor2);
			style.textContent = style.textContent.replace(/\{textcolor\}/g, user_options.textColor);
			style.textContent = style.textContent.replace(/\{backgroundpostlist\}/g, user_options.backgroundPostlist);
			style.textContent = style.textContent.replace(/\{backgroundforo\}/g, user_options.backgroundForo);
			style.textContent = style.textContent.replace(/\{backgroundpostbox\}/g, user_options.backgroundPostbox);
			style.textContent = style.textContent.replace(/\{backgroundpostbar\}/g, user_options.backgroundPostbar);
			style.textContent = style.textContent.replace(/\{backgroundtextbox\}/g, user_options.backgroundTextbox);
			style.textContent = style.textContent.replace(/\{fontfamily\}/g, user_options.font);
			style.textContent = style.textContent.replace(/\{fontsize\}/g, user_options.fontSize);
			style.textContent = style.textContent.replace(/\{borderbutton\}/g, user_options.borderButton);
			style.textContent = style.textContent.replace(/\{backgroundbutton\}/g, user_options.backgroundButton);
			style.textContent = style.textContent.replace(/\{textbutton\}/g, user_options.textButton);
			style.textContent = style.textContent.replace(/\{hoverbutton\}/g, user_options.hoverButton);
			style.textContent = style.textContent.replace(/\{hoverlink\}/g, user_options.hoverLink);
			style.textContent = style.textContent.replace(/\{backgroundmodal\}/g, user_options.backgroundModal);
			style.textContent = style.textContent.replace(/\{postcolor\}/g, user_options.postColor);
			style.textContent = style.textContent.replace(/\{linksbarcolor\}/g, user_options.linksbarColor);
			style.textContent = style.textContent.replace(/\{postlink\}/g, user_options.postLink);
			style.textContent = style.textContent.replace(/\{posthover\}/g, user_options.postHover);
			style.textContent = style.textContent.replace(/\{backgrounddropdown\}/g, user_options.backgroundDropdown);
			style.textContent = style.textContent.replace(/\{dropdowncolor\}/g, user_options.dropdownColor);
      style.textContent = style.textContent.replace(/\{bordertopiclist\}/g, user_options.borderTopiclist);
      style.textContent = style.textContent.replace(/\{paginationcolor\}/g, user_options.paginationColor);
      style.textContent = style.textContent.replace(/\{backgroundpagination\}/g, user_options.backgroundPagination);
      style.textContent = style.textContent.replace(/\{tagcolor1\}/g, user_options.tagColor1);
      style.textContent = style.textContent.replace(/\{tagcolor2\}/g, user_options.tagColor2);
      style.textContent = style.textContent.replace(/\{listcolor\}/g, user_options.listColor);
      style.textContent = style.textContent.replace(/\{listcolor2\}/g, user_options.listColor2);
      style.textContent = style.textContent.replace(/\{unreadlistcolor\}/g, user_options.unreadlistColor);
      style.textContent = style.textContent.replace(/\{smalllistcolor\}/g, user_options.smalllistColor);
      style.textContent = style.textContent.replace(/\{backgroundcomposer1\}/g, user_options.backgroundComposer1);
      style.textContent = style.textContent.replace(/\{backgroundcomposer2\}/g, user_options.backgroundComposer2);
      style.textContent = style.textContent.replace(/\{backgroundwell\}/g, user_options.backgroundWell);
      style.textContent = style.textContent.replace(/\{backgroundform\}/g, user_options.backgroundForm);
      style.textContent = style.textContent.replace(/\{formcolor\}/g, user_options.formColor);
      style.textContent = style.textContent.replace(/\{composericonscolor\}/g, user_options.composericonsColor);
      style.textContent = style.textContent.replace(/\{postdetailscolor\}/g, user_options.postdetailsColor);
      style.textContent = style.textContent.replace(/\{color3\}/g, user_options.brandColor3);
      style.textContent = style.textContent.replace(/\{alternativecolor\}/g, user_options.alternativeColor);


		}


		document.getElementsByTagName('head')[0].appendChild(style);
	}



  /* Carga las opciones de personalizacion del usuario para el foro en general */
  function getUserCustomization() {
    //console.log("entramos en el getuser");
    //console.log(user_options);
    // Obtenemos la personalizacion
    //user_options_default();
    //saveUserCustomization(user_options);

    socket.emit('topics.getUserCustomization', {}, function (err, topicOptions) {
    if (topicOptions) {
        topicOptions= JSON.parse(topicOptions);
        //console.log(topicOptions);
        user_options = topicOptions;
        //user_options.headerImage = null;
        //user_options.usecode = false;
        //user_options.brandColor = sanitize(user_options.brandColor);

        setUserCustomization();
        localStorage.setItem("userCustomization", JSON.stringify(user_options));
      }
      else
      {
        //console.log("borrado");
        localStorage.removeItem("userCustomization");
      }
    });
  }

	/* Guardar personalizacion de usuario */
	function saveUserCustomization(savedata) {
		//console.log("datos a guardar");
		//console.log(savedata);

		if(savedata)
		{
			localStorage.setItem("userCustomization", JSON.stringify(savedata));
		}
		else
		{
			localStorage.removeItem("userCustomization");
		}


		socket.emit('topics.saveUserCustomization', {
			options: savedata
		}, function(err, r){
			if(!err)
			{
				app.alert({
					type: 'success',
					timeout: 3000,
					title: 'Guardado!',
					message: "Personalización guardada!",
					alert_id: 'customization_ok'
				});
			}
			else
			{
				app.alert({
					type: 'danger',
					timeout: 3000,
					title: 'Error',
					message: "Hubo un error al guardar!",
					alert_id: 'customization_error'
				});
			}
		});
	}

/* saves the code on a variable */
	function make_code(codigo){
		var codigo_unico = {};
		var temp = codigo.split('#');

		//codigo_unico.hideTitle = temp[1];
		codigo_unico.font = temp[1];
		//codigo_unico.fontSize = temp[3];
    codigo_unico.alternativeColor =  '#' + temp[2];
    codigo_unico.brandColor3= '#' + temp[3];
    codigo_unico.brandColor = '#' + temp[4];
		codigo_unico.brandColor2 = '#' + temp[5];
		codigo_unico.backgroundPostlist = '#' + temp[6];
		codigo_unico.backgroundForo = '#' + temp[7];
		codigo_unico.textColor = '#' + temp[8];
    codigo_unico.borderButton = '#' + temp[9];
    codigo_unico.backgroundButton = '#' + temp[10];
    codigo_unico.textButton = '#' + temp[11];
    codigo_unico.hoverButton = '#' + temp[12];
    codigo_unico.hoverLink = '#' + temp[13];
    codigo_unico.backgroundModal = '#' + temp[14];
    codigo_unico.backgroundPostbox = '#' + temp[15];
    codigo_unico.backgroundTextbox = '#' + temp[16];
    codigo_unico.backgroundPostbar = '#' + temp[17];
    codigo_unico.postColor = '#' + temp[18];
    codigo_unico.linksbarColor = '#' + temp[19];
	  codigo_unico.postLink = '#' + temp[20];
	  codigo_unico.postHover = '#' + temp[21];
	  codigo_unico.backgroundDropdown = '#' + temp[22];
    codigo_unico.dropdownColor = '#' + temp[23];
    codigo_unico.borderTopiclist = '#' + temp[24];
    codigo_unico.paginationColor = '#' + temp[25];
    codigo_unico.backgroundPagination = '#' + temp[26];
    codigo_unico.tagColor1 = '#' + temp[27];
    codigo_unico.tagColor2 = '#' + temp[28];
    codigo_unico.listColor = '#' + temp[29];
    codigo_unico.unreadlistColor = '#' + temp[30];
    codigo_unico.listColor2 = '#' + temp[31];
    codigo_unico.smalllistColor = '#' + temp[32];
    codigo_unico.backgroundComposer1 = '#' + temp[33];
    codigo_unico.backgroundComposer2 = '#' + temp[34];
    codigo_unico.backgroundWell = '#' + temp[35];
    codigo_unico.backgroundForm = '#' + temp[36];
    codigo_unico.formColor = '#' + temp[37];
    codigo_unico.composericonsColor = '#' + temp[38];
    codigo_unico.postdetailsColor= '#' + temp[39];

		return(codigo_unico);
	}

	/* print our customization on a string code */
	function print_code(codigo_unico){
		var exocode = '';
    if(codigo_unico.custom || user_options.usecode){
		//console.log(codigo_unico);

		//exocode += '#';
	  //exocode += codigo_unico.hideTitle;
		//exocode += '#';
		//exocode += codigo_unico.fontSize;
		exocode += '#';
		exocode += codigo_unico.font;
    exocode += codigo_unico.alternativeColor;
    exocode += codigo_unico.brandColor3;
		exocode += codigo_unico.brandColor;
		exocode += codigo_unico.brandColor2;
		exocode += codigo_unico.backgroundPostlist;
		exocode += codigo_unico.backgroundForo;
		exocode += codigo_unico.textColor;
    exocode += codigo_unico.borderButton;
    exocode += codigo_unico.backgroundButton;
    exocode += codigo_unico.textButton;
    exocode += codigo_unico.hoverButton;
    exocode += codigo_unico.hoverLink;
    exocode += codigo_unico.backgroundModal;
    exocode += codigo_unico.backgroundPostbox;
    exocode += codigo_unico.backgroundTextbox;
    exocode += codigo_unico.backgroundPostbar;
    exocode += codigo_unico.postColor;
    exocode += codigo_unico.linksbarColor;
    exocode += codigo_unico.postLink;
    exocode += codigo_unico.postHover;
    exocode += codigo_unico.backgroundDropdown;
    exocode += codigo_unico.dropdownColor;
    exocode += codigo_unico.borderTopiclist;
    exocode += codigo_unico.paginationColor;
    exocode += codigo_unico.backgroundPagination;
    exocode += codigo_unico.tagColor1;
    exocode += codigo_unico.tagColor2;
    exocode += codigo_unico.listColor;
    exocode += codigo_unico.unreadlistColor;
    exocode += codigo_unico.listColor2;
    exocode += codigo_unico.smalllistColor;
    exocode += codigo_unico.backgroundComposer1;
    exocode += codigo_unico.backgroundComposer2;
    exocode += codigo_unico.backgroundWell;
    exocode += codigo_unico.backgroundForm;
    exocode += codigo_unico.formColor;
    exocode += codigo_unico.composericonsColor;
    exocode += codigo_unico.postdetailsColor;

    }
    else {
      exocode = "#Open Sans,sans-serif#333302#333303#333304#333305#333306#333307#333308#333309#333310#333311#333312#333313#333314#333315#333316#333317#333318#333319#333320#333321#333322#333323#333324#333325#333326#333327#333328#333329#333330#333331#333332#333333#333334#333335#333336#333337#333338#333339"
    }
		return(exocode);
	}

	/* Mostrar dialogo para guardar y elegir personalizacion del foro */
	function openUserCustomizeWindow(custom_code) {

		if (user_options.usecode){

      //creating new object with code values
			//var custom_code = {};
      //console.log(codigo.value);
			//custom_code = make_code(codigo.value);

			window.templates.parse('user_customizer', {
				topic_title: "Titulo",

        alternative_color: custom_code.alternativeColor || '#333333',
        brand_color3: custom_code.brandColor3 || '#333333',
				brand_color: custom_code.brandColor || '#333333',
				brand_color2: custom_code.brandColor2 || '#333333',
				//hide_title: custom_code.hideTitle || false,
				background_postlist: custom_code.backgroundPostlist || '#333333',
				background_foro: custom_code.backgroundForo || '#333333',
				text_color: custom_code.textColor || '#2e3539',
				font_family: custom_code.font || '"Open Sans",sans-serif',
				//font_size: custom_code.fontSize || '13',
        border_button: custom_code.borderButton || '#333333',
        background_button: custom_code.backgroundButton || '#333333',
        text_button: custom_code.textButton || '#333333',
        hover_button: custom_code.hoverButton || '#333333',
        hover_link: custom_code.hoverLink || '#333333',
        background_modal: custom_code.backgroundModal || '#333333',
        background_postbox: custom_code.backgroundPostbox || '#333333',
        background_textbox: custom_code.backgroundTextbox || '#333333',
        background_postbar: custom_code.backgroundPostbar || '#333333',
        post_color: custom_code.postColor || '#333333',
        linksbar_color: custom_code.linksbarColor || '#333333',
				post_link: custom_code.postLink || '#333333',
				post_hover: custom_code.postHover || '#333333',
				background_dropdown: custom_code.backgroundDropdown || '#333333',
				dropdown_color: custom_code.dropdownColor || '#333333',
        border_topiclist: custom_code.borderTopiclist || '#333333',
        pagination_color: custom_code.paginationColor || '#333333',
        background_pagination: custom_code.backgroundPagination || '#333333',
        tag_color1: custom_code.tagColor1 || '#333333',
        tag_color2: custom_code.tagColor2 || '#333333',
        list_color: custom_code.listColor || '#333333',
        unreadlist_color: custom_code.unreadlistColor || '#333333',
        list_color2: custom_code.listColor2 || '#333333',
        smalllist_color: custom_code.smalllistColor || '#333333',
        background_composer1: custom_code.backgroundComposer1 || '#333333',
        background_composer2: custom_code.backgroundComposer2 || '#333333',
        background_well: custom_code.backgroundWell || '#333333',
        background_form: custom_code.backgroundForm || '#333333',
        form_color: custom_code.formColor || '#333333',
        composericons_color: custom_code.composericonsColor || '#333333',
        postdetails_color: custom_code.postdetailsColor || '#333333',


				code: print_code(custom_code) || ''
			}, function (template) {

				var dialog = buildUserCustomizationDialog(template);

			});
			user_options = {};
		}
		else {
			user_options = {};

		if(localStorage.userCustomization)
		{
			//esto es un poco redundante
			user_options = JSON.parse(localStorage.userCustomization);
		}
		window.templates.parse('user_customizer', {
			topic_title: "Titulo",
      alternative_color: user_options.alternativeColor || '#333333',
      brand_color3: user_options.brandColor3 || '#333333',
			brand_color: user_options.brandColor || '#333333',
			brand_color2: user_options.brandColor2 || '#333333',
			//hide_title: user_options.hideTitle || false,
			background_postlist: user_options.backgroundPostlist || '#333333',
			background_foro: user_options.backgroundForo || '#333333',
			text_color: user_options.textColor || '#2e3539',
			font_family: user_options.font || 'Open Sans,sans-serif',
			//font_size: user_options.fontSize || '13',
      border_button: user_options.borderButton || '#333333',
      background_button: user_options.backgroundButton || '#333333',
      text_button: user_options.textButton || '#333333',
      hover_button: user_options.hoverButton || '#333333',
      hover_link: user_options.hoverLink || '#333333',
      background_modal: user_options.backgroundModal || '#333333',
      background_postbox: user_options.backgroundPostbox || '#333333',
      background_textbox: user_options.backgroundTextbox || '#333333',
      background_postbar: user_options.backgroundPostbar || '#333333',
      post_color: user_options.postColor || '#333333',
      linksbar_color: user_options.linksbarColor || '#333333',
			post_link: user_options.postLink || '#333333',
			post_hover: user_options.postHover || '#333333',
			background_dropdown: user_options.backgroundDropdown || '#333333',
			dropdown_color: user_options.dropdownColor || '#333333',
      border_topiclist: user_options.borderTopiclist || '#333333',
      pagination_color: user_options.paginationColor || '#333333',
      background_pagination: user_options.backgroundPagination || '#333333',
      tag_color1: user_options.tagColor1 || '#333333',
      tag_color2: user_options.tagColor2 || '#333333',
      list_color: user_options.listColor || '#333333',
      unreadlist_color: user_options.unreadlistColor || '#333333',
      list_color2: user_options.listColor2 || '#333333',
      smalllist_color: user_options.smalllistColor || '#333333',
      background_composer1: user_options.backgroundComposer1 || '#333333',
      background_composer2: user_options.backgroundComposer2 || '#333333',
      background_well: user_options.backgroundWell || '#333333',
      background_form: user_options.backgroundForm || '#333333',
      form_color: user_options.formColor || '#333333',
      composericons_color: user_options.composericonsColor || '#333333',
      postdetails_color: user_options.postdetailsColor || '#333333',



			code: print_code(user_options) || ''
		}, function (template) {

				var dialog = buildUserCustomizationDialog(template);

		});

		}
	}



	function buildUserCustomizationDialog(template) {
		return bootbox.dialog({
			title: 'Personalizar',
      className: "personalize",
      size: "large",
			message: template,
			buttons: {
				"code": {
					label: 'Cargar Codigo',
					className: 'btn-default',
					callback: function(e) {

  						user_options.usecode = true;
              //creating new object with code values
              var custom_codigo = {};
              //console.log(codigo.value);
              custom_codigo = make_code(code.value);
  						openUserCustomizeWindow(custom_codigo);
					}
				},
				"default": {
					label: 'Usar colores por defecto',
					className: 'btn-default',
					callback: function (e) {
            user_options_default();
						saveUserCustomization(user_options);
						getUserCustomization();
						return $("#custom-topic-style").remove();
					}
				},
        "night": {
					label: 'Modo noche',
					className: 'btn-default',
					callback: function (e) {
            var codestring = user_options_night();
            user_options.usecode = true;
            //creating new object with code values

            user_options = make_code(codestring);
            user_options.custom = true;
            saveUserCustomization(user_options);
						getUserCustomization();
						return $("#custom-topic-style").remove();
					}
				},
				cancel: {
					label: 'Cancelar',
					className: 'btn-danger',
					callback: function (e) {
						getUserCustomization();
						return true;
					}
				},
				save: {
					label: 'Aceptar',
					className: 'btn-primary',
					callback: function (e) {
						//user_options.headerImage = sanitize($('#header-image-input').val());

            user_options.alternativeColor = sanitize($('#alternative-color-input').val());
            user_options.brandColor3 = sanitize($('#brand-color3-input').val());
						user_options.brandColor = sanitize($('#brand-color-input').val());
						user_options.brandColor2 = sanitize($('#brand-color2-input').val());
						user_options.textColor = sanitize($('#text-color-input').val());
						user_options.backgroundPostlist = sanitize($('#background-postlist-input').val());
						user_options.backgroundForo = sanitize($('#background-foro-input').val());
						user_options.font = sanitize($('#font-family-input').val());
						//user_options.fontSize = sanitize($('#font-size-input').val());
						//user_options.hideTitle = $('#hide-title-check').get(0).checked;
            user_options.borderButton = sanitize($('#border-button-input').val());
            user_options.backgroundButton = sanitize($('#background-button-input').val());
            user_options.textButton = sanitize($('#text-button-input').val());
            user_options.hoverButton = sanitize($('#hover-button-input').val());
            user_options.hoverLink = sanitize($('#hover-link-input').val());
            user_options.backgroundModal = sanitize($('#background-modal-input').val());
            user_options.backgroundPostbox = sanitize($('#background-postbox-input').val());
            user_options.backgroundTextbox = sanitize($('#background-textbox-input').val());
            user_options.backgroundPostbar = sanitize($('#background-postbar-input').val());
            user_options.postColor = sanitize($('#post-color-input').val());
            user_options.linksbarColor = sanitize($('#linksbar-color-input').val());
            user_options.postLink = sanitize($('#post-link-input').val());
            user_options.postHover = sanitize($('#post-hover-input').val());
            user_options.backgroundDropdown= sanitize($('#background-dropdown-input').val());
            user_options.dropdownColor = sanitize($('#dropdown-color-input').val());
            user_options.borderTopiclist = sanitize($('#border-topiclist-input').val());
            user_options.paginationColor = sanitize($('#pagination-color-input').val());
            user_options.backgroundPagination = sanitize($('#background-pagination-input').val());
            user_options.tagColor1 = sanitize($('#tag-color1-input').val());
            user_options.tagColor2 = sanitize($('#tag-color2-input').val());
            user_options.listColor = sanitize($('#list-color-input').val());
            user_options.unreadlistColor = sanitize($('#unreadlist-color-input').val());
            user_options.listColor2 = sanitize($('#list-color2-input').val());
            user_options.smalllistColor = sanitize($('#smalllist-color-input').val());
            user_options.backgroundComposer1 = sanitize($('#background-composer1-input').val());
            user_options.backgroundComposer2 = sanitize($('#background-composer2-input').val());
            user_options.backgroundWell = sanitize($('#background-well-input').val());
            user_options.backgroundForm = sanitize($('#background-form-input').val());
            user_options.formColor = sanitize($('#form-color-input').val());
            user_options.composericonsColor = sanitize($('#composericons-color-input').val());
            user_options.postdetailsColor = sanitize($('#postdetails-color-input').val());
						//user_options.usecode = $('#use-code-check').get(0).checked;
						user_options.usecode = false;
						// check font size
						//user_options.fontSize = user_options.fontSize > 28 ? 28 : user_options.fontSize;
						//user_options.fontSize = user_options.fontSize < 8 ? 8 : user_options.fontSize;
            user_options.custom = true; //flag to know code is saved
						saveUserCustomization(user_options);
						return getUserCustomization(user_options);
					}
				}
			}
		});
	}

  function user_options_default(){

			user_options = {};
      user_options.brandColor = '';
  		//user_options.headerImage = '',
  		//user_options.hideTitle = false;
      user_options.usecode = false;
      user_options.custom = false;

  }

  function user_options_night(){

    //var night_code ="#Open Sans,sans-serif#424242#ffffff#7a9ab8#424242#26292b#0c0c18#5982a7#234999#333333#5982a7#3b6ca6#5982a7#646464#2d2d2d#333333#2d2d2d#5982a7#3b6ca6#3b6ca6#3b6ca6#424242#7a9ab8#424242#5982a7#424242#424242#1c1c1c#5982a7#5e8cff#ffffff#999999#2d2d2d#424242#424242#424242#ffffff#ffffff#ffffff";
    var night_code ="#Open Sans,sans-serif#424242#ffffff#7a9ab8#424242#26292b#0c0c18#5982a7#234999#333333#5982a7#3b6ca6#5982a7#b5b5b5#2d2d2d#333333#2d2d2d#5982a7#3b6ca6#3b6ca6#3b6ca6#424242#7a9ab8#424242#5982a7#424242#424242#1c1c1c#5982a7#5e8cff#ffffff#999999#2d2d2d#424242#424242#424242#ffffff#ffffff#ffffff";
    return(night_code);


      //#true#Open Sans,sans-serif#13#ff0000#646464#804040#8080c0#5982a7#ffff00#ffffff#ff8040#ff0000#ff80c0#552d52#008000#ff8000#808000#ffffff#ffff00#800040#80ffff#408080#ff80c0#8f8f8f#000000#808080#000000#ffffff#408080#ffffff#0000a0#00ff00#d2d2d2#0080ff#ff8000#ff80c0#ffffff#ff0080
      //#true#Open Sans,sans-serif#13#ff0000#646464#804040#8080c0#5982a7#ffff00#ffffff#ff8040#ff0000#ff80c0#552d52#008000#ff8000#808000#ffffff#ffff00#800040#80ffff#408080#ff80c0#8f8f8f#8000ff#808080#00ff00#ffffff#408080#ffffff#0000a0#00ff00#d2d2d2#0080ff#ff8000#ff80c0#ffffff#ff0080#008080#ff0080

  }


		function init() {

/*
			var topicID = ajaxify.data.tid;
			var options = {
				brandColor: '',
				headerImage: '',
				hideTitle: false
			};
			// Añadimos un botón al header para que el usuario pueda empezar a personalizar (Si es administrador o el creador del hilo)
			socket.emit('topics.canCustomize', {
				tid: topicID
			}, function (err, canCustomize) {
				if (canCustomize) {
					var $button = $('<button class="btn btn-sm btn-default customize-topic hidden-xs" title="Personalizar"><i class="fa fa-paint-brush fa-lg"></i></button>');
					$('.topic').append($button);
					$button.tooltip({
						placement: 'left'
					});
					$button.click(function () {
						openCustomizeWindow(options);
					});
				}
			});

			// Comprobamos si el hilo actual tiene alguna personalización
			socket.emit('topics.getCustomization', {
				tid: topicID
			}, function (err, topicOptions) {
				if (topicOptions) {
					options = topicOptions;
					//console.log("opciones cargadas");
					//console.log(topicOptions);
					options.headerImage = sanitize(options.headerImage);
					options.brandColor = sanitize(options.brandColor);
					//options.hideTitle =
					loadCustomizations(options);
				}
			});
      */
		}


        		function sanitize(val) {
        			return val && val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        		}


  	/** Cargar las personalizaciones elegidas. */
/*
		function loadCustomizations(options) {

			$('.topic').addClass('custom-topic');

			// Imagen de la cabecera
			if (options.headerImage) {
				var $header = $('.custom-topic-header');

				if (!$header.length) {
					$header = $('<div class="custom-topic-header"></div>');
					$('.topic').prepend($header).addClass('with-custom-header');
				}

				$header.css('background', BACKGROUND_PROPERTY.replace('{url}', options.headerImage));
			}


			// Inyectamos estilos
			$('#custom-topic-style').remove();
			var style = document.createElement('style');
			style.type = 'text/css';
			style.id = 'custom-topic-style';

			// Reemplazamos todos los elementos que tengan el color del tema por defecto
			if (options.brandColor && options.brandColor.match(/^(#\w{3,6}|[a-z]+)$/i)) {
				// Elementos de un topic
				style.textContent += '.custom-topic .post-row .post-header {background: {color}; border-color: {color};}';
				style.textContent += '.custom-topic a {color: {color}}';
				style.textContent += '.custom-topic .username-field {color: {textcolor} !important}';
				style.textContent += '.custom-topic .btn-exodo .exright {background: {color}}';
				style.textContent += '.custom-topic .pagination > .active > a {background: {color}; border-color: {color}; color: white; }';
				style.textContent += '.custom-topic .pagination a, .custom-topic .pagination a:hover {color: {color};}';
				style.textContent += '.ribbon-green a {color: white}';

				// Elementos del resto del foro
				if(localStorage.userCustomization)
				{
					// Gradiente linear-gradient(to right, {color} 0px, {color2} 100%)
					style.textContent += '.tag-topic-count {background: {color}; border-color: {color};}';
					style.textContent += '.tag-item {background: {color}; border-color: {color};}';
					style.textContent += '.pagination > .active > a {background: {color}; border-color: {color}; color: white; }';
					style.textContent += '.pagination a, .pagination a:hover {color: {color};}';
					style.textContent += 'body a {color: {color}}';
					style.textContent += '.btn-exodo .exright {background: {color}}';
					style.textContent += '.loading-bar {background: linear-gradient(to right, {color} 0px, {color2} 100%)}';

					// headers con degradados
					style.textContent += '.category .category-topics .category-item .topic-row .threadinfo>small a {color: {color}}';
					style.textContent += '.category .category-topics .category-item .topic-row .threadlastpost a.lastpost {color: {color}}';
					style.textContent += '.panel-default > .panel-heading {background:linear-gradient(to right, {color} 0px, {color2} 100%); border-color: {color};}';
					style.textContent += '.category .category-topics .threadlisthead {background:linear-gradient(to right, {color} 0px, {color2} 100%); border-color: {color};}';
					style.textContent += '.custom-topic .post-row .post-header {background:linear-gradient(to right, {color} 0px, {color2} 100%); border-color: {color};}';

					style.textContent += 'body {color: {textcolor}}';
					style.textContent += '.category .category-head .category-head-top h1 {color: {color}}';

					style.textContent += '.topic .posts .post-wrapper .post-details .userinfo {background: {backgroundpostlist}}';
					style.textContent += '.posts .post-wrapper .post-details .userinfo-extra {background: {backgroundpostlist}}';
					style.textContent += '.posts .post-details {background: {backgroundpostlist}}';
					style.textContent += '.posts .post-wrapper {background: {backgroundpostlist}}';
					style.textContent += '.posts .post-wrapper .post-details .post-block {background: {backgroundpostlist}}';
					style.textContent += '.posts .post-wrapper .post-info {background: {backgroundpostlist}}';
					style.textContent += '.topic .posts .post-wrapper .post-details .post-block {background: {backgroundpostlist}}';
					style.textContent += '.posts .post-signature {background: {backgroundpostlist}}';
					style.textContent += '.panel-body {background: {backgroundpostlist}}';
					style.textContent += '.panel {background: {backgroundpostlist}}';
					style.textContent += '.category-item.pinned .topic-row {background: {backgroundpostlist}}';
					style.textContent += '.category .category-topics .threadlisthead .category-item .topic-row {background: {backgroundpostlist};}';
					style.textContent += '.topic .posts .post-wrapper .post-details {background: {backgroundpostlist}}';

					style.textContent += 'body {font-family: {fontfamily}}';
					style.textContent += 'body {font-size: {fontsize}px}';

					style.textContent += '.ribbon-green a {color: white}';

					if(options.backgroundForo != "")
					{
						style.textContent += 'html {background: {bgcolor2}}';
					}

					//style.textContent += 'p {font-family: {fontfamily}}';
					//style.textContent += 'a {font-family: {fontfamily}}';
					//style.textContent += 'i {font-family: {fontfamily}}';
				}

				style.textContent = style.textContent.replace(/\{color\}/g, options.brandColor);
				style.textContent = style.textContent.replace(/\{color2\}/g, options.brandColor2);
				style.textContent = style.textContent.replace(/\{textcolor\}/g, options.textColor);
				style.textContent = style.textContent.replace(/\{bgcolor\}/g, options.backgroundPostlist);
				style.textContent = style.textContent.replace(/\{bgcolor2\}/g, options.backgroundForo);
				style.textContent = style.textContent.replace(/\{fontfamily\}/g, options.font);
				style.textContent = style.textContent.replace(/\{fontsize\}/g, options.fontSize);
			}

			// Ocultar titulo
			if (options.hideTitle) {
				style.textContent += '.custom-topic .topic-head-top h1 a {display: none;}';
			}

			document.getElementsByTagName('head')[0].appendChild(style);
		}

*/


/*
		function openCustomizeWindow(options) {

				console.log("ventana de customizado");
				console.log(options);
			window.templates.parse('topic_customizer', {
				topic_title: ajaxify.data.title,
				header_image: options.headerImage || '',
				brand_color: options.brandColor || '',
				hide_title: options.hideTitle || false
			}, function (template) {

				var dialog = buildDialog(template,options);

				var preview = dialog.find('.topic-preview');

				if (options.headerImage) {
					preview.find('.topic-preview-header').css('background', BACKGROUND_PROPERTY.replace('{url}', options.headerImage));
				}
				preview.find('.topic-preview-post-title').css('background', options.brandColor);

				dialog.find('#header-image-input').keyup(function () {
					var $status = $('#header-image-loading > i');
					var url = $(this).val();
					preview.find('.topic-preview-header').css('background', BACKGROUND_PROPERTY.replace('{url}', ''));
					if (!url) {
						$status.attr('class', 'fa fa-globe');
					} else if (url.match(/^https?:\/\/.+?\/.+?\.(png|jpg|jpeg|gif)$/)) {
						$status.attr('class', 'fa fa-spin fa-refresh');
						var bgImg = new Image();
						bgImg.onload = function () {
							$status.attr('class', 'fa fa-check');
							preview.find('.topic-preview-header').css('background', BACKGROUND_PROPERTY.replace('{url}', url));
						};
						bgImg.src = url;
					} else {
						$status.attr('class', 'fa fa-close');
					}
				});

				dialog.find('#brand-color-input').keyup(function () {
					var color = $(this).val();

					if (color && color.match(/^(#\w{3,6}|[a-z]+)$/i)) {
						preview.find('.topic-preview-post-title').css('background', color);
					} else {
						preview.find('.topic-preview-post-title').css('background', '');
					}
				});

				dialog.find('#hide-title-check').change(function () {
					if ($(this).get(0).checked) {
						preview.find('.topic-preview-title').addClass('hide');
					} else {
						preview.find('.topic-preview-title').removeClass('hide');
					}
				});
			});
		}

*/
/*
		function buildDialog(template,options) {

			return bootbox.dialog({
				title: 'Personalizar',
				message: template,
				buttons: {
					cancel: {
						label: 'Cancelar',
						className: 'btn-default',
						callback: function (e) {
							return true;
						}
					},
					save: {
						label: 'Aceptar',
						className: 'btn-primary',
						callback: function (e) {
							options.headerImage = sanitize($('#header-image-input').val());
							options.brandColor = sanitize($('#brand-color-input').val());
							options.hideTitle =$('#hide-title-check').get(0).checked;
							console.log("construyendo dialogo");
							console.log(options.brandColor);
							console.log(options.headerImage);
							console.log(options.hideTitle);
							saveCustomizations(options);
							return loadCustomizations(options);
						}
					}
				}
			});
		}
    */


/*
		function saveCustomizations(options) {
				socket.emit('topics.saveCustomization', {
					tid: ajaxify.data.tid,
					options: options
				}, function(err, r){
					if(!err)
					{
						app.alert({
							type: 'success',
							timeout: 3000,
							title: 'Guardado!',
							message: "Personalización guardada!",
							alert_id: 'customization_ok'
						});
					}
					else
					{
						app.alert({
							type: 'danger',
							timeout: 3000,
							title: 'Error',
							message: "Hubo un error al guardar! Asegurate de que sea una imagen y de que no exceda un tamaño de 300KB",
							alert_id: 'customization_error'
						});
					}
				});
			}

*/


}());
