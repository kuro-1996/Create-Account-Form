$(document).ready(function () {
	//step 1 input clear validate text
	$('.step1 input').keyup(function () {
		$(this).siblings("span").remove();
	})
	//add step1 name input validate border and text
	$('.step1 input[type="text"]').keyup(function() { 
		var inputVal = $(this).val();
		var characterReg = /^([\sa-zA-Z_àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]{2,30})$/;
		if (!characterReg.test(inputVal)) 
			$(this).removeClass('valid').addClass("invalid");
		else $(this).removeClass("invalid").addClass("valid");
		ValidInput($(this));	
	});
	//add step1's day input validate border and text
	$('#day').keyup(function () {	
		var inputVal = $(this).val(); 
		var characterReg = /^([0-9]{1,2})$/;
		if (!characterReg.test(inputVal) || inputVal > 31 || inputVal < 1){
			$(this).removeClass("valid").addClass("invalid");	
			$(this).parent().removeClass("valid").addClass("invalid");}
		if (characterReg.test(inputVal) && inputVal <= 31 && inputVal >= 1) {
			$(this).removeClass("invalid").addClass("valid");	
			checkDate();}	
		ValidNumber($(this).parent());	
	});
	//add step1's month input validate border and text
	$("#month").keyup(function () { 
		var inputVal = $(this).val();
		var characterReg = /^([0-9]{1,2})$/;
		if (!characterReg.test(inputVal) || inputVal > 12 || inputVal < 1) {
			$(this).removeClass('valid').addClass("invalid");
			$(this).parent().removeClass("valid").addClass("invalid");}
		if (characterReg.test(inputVal) && inputVal <= 12 && inputVal >= 1) {
			$(this).removeClass("invalid").addClass("valid");	
			checkDate();}	
		ValidNumber($(this).parent());
	});
	var currentyear = new Date().getFullYear(); //get current year
	//add step1's year input validate border and text
	$("#year").keyup(function () { 
		var inputVal = $(this).val();
		var characterReg = /^([0-9]{4})$/;
		if (!characterReg.test(inputVal) || inputVal > currentyear || inputVal < 1900) {
			$(this).removeClass("valid").addClass("invalid");
			$(this).parent().removeClass("valid").addClass("invalid");}	
		if (characterReg.test(inputVal) && inputVal <= currentyear && inputVal >= 1900) {
			$(this).removeClass("invalid").addClass("valid");	
			checkDate();}		
		ValidNumber($(this).parent());
	});
	// validation input type=text function
	function ValidInput(x) { 
		if (x.hasClass("valid")) {
			x.after('<span class="popup-valid">Valid</span>');
			x.siblings(".popup-invalid").remove();}
		if (x.hasClass("invalid")) {
			x.after('<span class="popup-invalid">Invalid</span>');
			x.siblings(".popup-valid").remove();}
	}
	// validation input type=number function
	function ValidNumber(x) {
		if (x.children("input.valid").length == 3) //if all number input is valid
		   {x.children().first().after('<span class="popup-valid">Valid</span>');
			x.children(".popup-invalid").remove();}
		if (x.children("input").hasClass("invalid")) 
		   {x.children().first().after('<span class="popup-invalid">Invalid</span>');
			x.children(".popup-valid").remove();}
	}
	//checkdate compare to current day function
	function checkDate() {
		var day = $('#day').val();
		var month = $("#month").val();
		var year = $("#year").val();
		var myDate = new Date(year, month - 1, day);
		var today = new Date();
		if (myDate > today && day>0 && month>0 && year>=1900 && month<=12 && day<=31 && year<=currentyear) 
			$("input[type='number']").removeClass('valid').addClass('invalid');
		if (myDate <= today && day > 0 && month > 0 && year>=1900 && month<=12 && day<=31 && year<=currentyear) 
			$("input[type='number']").removeClass("invalid").addClass("valid");
		if ((leapYear(year) && month == 2 && day > 29 && myDate <= today) ||
			(!leapYear(year) && month == 2 && day > 28 && myDate <= today)) 
			$("input[type='number']").removeClass("valid").addClass("invalid");
		if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31 && myDate <= today) 
			$("input[type='number']").removeClass("valid").addClass("invalid");		
	}
	//check leap year
	function leapYear(y){
		if (y % 4 == 0 || y % 400 == 0)
			return true;
		else return false;
	}
	//set default invalid class for btn
	$(".step1 button", ".form-submit").addClass("invalid");
	//validate when hover on step1 btn
	$(".step1 button").mouseenter(function () {
		if ($(".step1 select.valid").length == 2 && 
			$(".step1 input.valid").length == 5) //if all step1's input + select are valid
				$(".step1 button").removeClass("invalid"); 
		else $(".step1 button").addClass("invalid");
	})
	//validate when hover on submit btn
	$(".form-submit").mouseenter(function () {	
		if ($(".step3 select.valid").length == 3 &&
			$('.step3 input').parent('.valid').length == 3 &&
			$('.step3 input').parent().parent('.valid').length == 2) // if all option is selected and all radio is checked
				$(this).removeClass("invalid");
		else $(this).addClass("invalid");
	});
	//step1 button click action
	$(".step1 button").click(function () {
		//show step2 after click
		if (!$(".step1 button").hasClass("invalid") && !$(".step2__header").hasClass("change")) {
			$(".step1__header").addClass("change").removeClass("active"); //add checked icon
			$(".step1__content").hide("slow");
			$(".step2__content").show("slow");
			$(".step2__header").addClass("active");} //add triangle icon
		//show step3 if step2 has edit btn
		if ($(".step2__header").hasClass("change")) {
			$(".step1__header").addClass("change").removeClass("active"); //remove triangle icon then add checked icon
			$(".step1__content").hide("slow");
			$(".step3__content").show("slow");}
	});
	//add validation text after click step1 btn (just 1 time)
	$(".step1 button").one('click', function () {
		$(".step1 .popup-valid", ".step1 .popup-invalid").remove(); //remove old validation text
		$('.step1 input[type="text"]').each(function() {
			if ($(this).val() == "") $(this).addClass("invalid");
			ValidInput($(this)); //add new validation text
		});
		$('.step1 input[type="number"]').each(function () {
			$(this).parent().find('input[type="number"]').first().siblings('span').remove(); 
			if ($(this).val() == "") $(this).addClass("invalid");
			ValidInput($(this).parent().find('input[type="number"]').first());
		});
		$(".step1 select").each(function() {
			if ($(this).children("option:selected").val() == "")
				$(this).addClass("invalid");
			ValidInput($(this));
		});
	});
	//show step 3 and 'edit' btn after click step 2 btn	
	$('.step2 button').click(function() {
		$(".step3__content").show("slow");
		$(".step2__content").hide("slow");
		$(".step2__header").removeClass("active").addClass("change"); //add checked icon
		$(".step3__header").addClass("active"); //add triangle icon
	});
	//add validation text after click submit btn
	$('.form-submit').one('click',function () {
		$(".step3 select").each(function () {
			$(this).siblings('span').remove(); //remove old validation text
			if ($(this).children("option:selected").val() == "") $(this).addClass("invalid");
			ValidInput($(this)); //add new validation text
		});
		$('.finance__content input').each(function () {
			if (!$(this).is(':checked') && !$(this).parent().parent().hasClass("valid")) {
				$(this).parent().parent().siblings("span").remove(); //remove old validation text
				$(this).parent().parent().addClass("invalid");
				ValidInput($(this).parent().parent());} //add new validation text
		})
		$('.content__top input').each(function () {
			if (!$(this).is(':checked')&& !$(this).parent().parent().find('div').first().hasClass("valid")){
				$(this).parent().parent().find('div').first().siblings("span").remove(); //remove old validation text
				$(this).parent().parent().find('div').first().addClass("invalid");
				ValidInput($(this).parent().parent().find('div').first());} //add new validation text
		})
	})
	//show step1 after click step1's edit btn
	$(".step1__header span").click(function() {
		$(".step1__content").show("slow");
		$(".step1__header").removeClass("change").addClass("active");
		$(".step2__header").removeClass("active");
	});
	//show step2 after click step2's edit btn
	$(".step2__header span").click(function() {
		$(".step2__content").show("slow");
		$(".step2__header").removeClass("change").addClass("active");
		$(".step3__header").removeClass("active");
	});
	//add label background to checked radio btn
	$('.finance__content div').each(function () {
		$(this).children('.item__select').click(function () {	
			$(this).parent().parent().find('label').removeClass("active")
			$(this).siblings('label').addClass('active');
		})
	})
	//add validation text after select an option
	$("select").each(function () {
		$(this).change(function () {
			$(this).siblings("span").remove(); //remove old validation text
			if ($(this).children('option:selected').val() != "")  //if all option is selected
				$(this).removeClass("invalid").addClass("valid"); 
			else $(this).removeClass("valid").addClass("invalid"); 
			ValidInput($(this)); //add new validation text
		})	
	});
	//add validate text after click finance radio btn
	$('.finance__content input').each(function () { 
		$(this).click(function () {
			$(this).parent().parent().siblings("span").remove(); //remove old validation text
			$(this).parent().parent().removeClass("invalid").addClass("valid");
			ValidInput($(this).parent().parent()); //add new validation text
		})
	})
	//add validate text after click trading radio btn
	$('.content__top label').each(function () {
		$(this).click(function () {
			$(this).parent().parent().find('div').first().siblings("span").remove(); //remove old validation text
			$(this).parent().parent().find('div').first().removeClass("invalid").addClass("valid");
			ValidInput($(this).parent().parent().find('div').first()); //add new validation text
		})
	})
});
