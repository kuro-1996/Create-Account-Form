$(document).ready(function () {
	//add background when select
	$(".income .item__select").click(function() {
		$(".income .item__select").siblings("label").removeClass("active");
		$(this).siblings("label").addClass("active");
	});

	$(".invest .item__select").click(function() {
		$(".invest .item__select").siblings("label").removeClass("active");
		$(this).siblings("label").addClass("active");
	});
	//
	//step 1 input validation
	$('.step1 input[type="text"]').keyup(function() {
		$(this).siblings(".popup-invalid").remove();
		$(this).siblings(".popup-valid").remove();
		var inputVal = $(this).val();
		var characterReg = /^([\sa-zA-Z_àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]{2,30})$/;
		if (!characterReg.test(inputVal)) 
			$(this).removeClass('valid').addClass("invalid");
		else $(this).removeClass("invalid").addClass("valid");
		ValidInput($(this));
	});
	
	$('#day').keyup(function () {	
		$(this).siblings(".popup-valid").remove();
		$(this).siblings(".popup-invalid").remove();
		var inputVal = $(this).val();
		var characterReg = /^([0-9]{1,2})$/;
		if (!characterReg.test(inputVal) || inputVal > 31 || inputVal < 1) {
			$(this).removeClass("valid").addClass("invalid");	
			$(this).parent().removeClass("valid").addClass("invalid");
		}
		if (characterReg.test(inputVal) && inputVal <= 31 && inputVal >= 1) {
			$(this).removeClass("invalid").addClass("valid");	
			checkDate();
		}	
		ValidNumber($(this).parent());
	});
	
	$("#month").keyup(function () {
		$(this).siblings(".popup-valid").remove();
		$(this).siblings(".popup-invalid").remove();
		var inputVal = $(this).val();
		var characterReg = /^([0-9]{1,2})$/;
		if (!characterReg.test(inputVal) || inputVal > 12 || inputVal < 1) {
			$(this).removeClass('valid').addClass("invalid");
			$(this).parent().removeClass("valid").addClass("invalid");
		}
		if (characterReg.test(inputVal) && inputVal <= 12 && inputVal >= 1) {
			$(this).removeClass("invalid").addClass("valid");	
			checkDate();
		}	
		ValidNumber($(this).parent());
	});

	$("#year").keyup(function () {
		// $(this).removeClass("invalid");
		$(this).siblings(".popup-valid").remove();
		$(this).siblings(".popup-invalid").remove();
		var inputVal = $(this).val();
		var characterReg = /^([0-9]{4})$/;
		if (!characterReg.test(inputVal) || inputVal > currentyear || inputVal < 1900) {
			$(this).removeClass("valid").addClass("invalid");
			$(this).parent().removeClass("valid").addClass("invalid");
		}	
		if (characterReg.test(inputVal) && inputVal <= currentyear && inputVal >= 1900) {
			$(this).removeClass("invalid").addClass("valid");	
			checkDate();
		}		
		ValidNumber($(this).parent());
	});
	
	//validate input function
	function ValidInput(x) {
		if (x.hasClass("valid")) {
			x.after('<span class="popup-valid">Valid</span>');
			x.siblings(".popup-invalid").remove();
		}
		if (x.hasClass("invalid")) {
			x.after('<span class="popup-invalid">Invalid</span>');
			x.siblings(".popup-valid").remove();
		}
	}
	function ValidNumber(x) {
		if (x.children("input.valid").length == 3) {
			x.children().first().after('<span class="popup-valid">Valid</span>');
			x.children(".popup-invalid").remove();
		}
		if (x.children("input").hasClass("invalid")) {
			x.children().first().after('<span class="popup-invalid">Invalid</span>');
			x.children(".popup-valid").remove();
		}
	}
	//
	//checkdate compare to current day
	var currentyear = new Date().getFullYear();
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
		
		if (
			(leapYear(year) && month == 2 && day > 29 && myDate <= today) ||
			(!leapYear(year) && month == 2 && day > 28 && myDate <= today)
		) 
			$("input[type='number']").removeClass("valid").addClass("invalid");

		if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31 && myDate <= today) 
			$("input[type='number']").removeClass("valid").addClass("invalid");		
	}
	//
	//check leap year
	function leapYear(y){
		if (y % 4 == 0 || y % 400 == 0)
			return true;
		else return false;
	}
	//
	//select box validation
	$("select").each(function () {
		$(this).change(function () {
			if ($(this).children('option:selected').val() != "") {
				$(this).removeClass("invalid").addClass("valid");
				$(this).siblings('.popup-invalid').remove();
			}
			else {
				$(this).removeClass("valid").addClass("invalid");
				$(this).siblings(".popup-valid").remove();
			}
			ValidInput($(this));
		})	
	});
	//button hover validation
	$(".step1 button").addClass("invalid");
	$(".form-submit").addClass("invalid");

	$(".step1 button").mouseenter(function () {
		if (
			$('.step1 input[type="text"]').val() != "" &&
			$("#city option:selected").val() != "" &&
			$("#title option:selected").val() != "" &&
			!$('.step1 input[type="text"]').hasClass("invalid") &&
			!$("#city").hasClass("invalid") &&
			!$('.step1 input[type="number"]').hasClass("invalid") &&
			$('.step1 input[type="number"]').val() != ""
		)
			$(".step1 button").removeClass("invalid");
		else $(".step1 button").addClass("invalid");
	})
	
	$(".form-submit").mouseenter(function () {
		if (
			$(".step3 option:selected").val() != "" &&
			$('.step3 input[type="radio"]:checked').val() != undefined &&
			$(".step3 select.valid").length == 3 &&
			$('.step3 input[type="radio"].valid').length == 12 &&
			$('.step3 input[type="radio"] + label.valid').length == 12
		)
			$(this).removeClass("invalid").addClass('valid');
		else $(this).removeClass('valid').addClass("invalid");
	});
	//
	//next page button action
	$(".step1 button").click(function() {
		if (!$(".step1 button").hasClass("invalid") && !$(".step2__header").hasClass("change")) {
			$(".step1__header").addClass("change").removeClass("active");
			$(".step1__content").hide("slow");
			$(".step2__content").show("slow");
			$(".step2__header").addClass("active");
		}

		if ($(".step2__header").hasClass("change")) {
			$(".step1__header").addClass("change").removeClass("active");
			$(".step1__content").hide("slow");
			$(".step3__content").show("slow");
		}
	});
	$(".step1 button").one('click', function () {
		$('.step1 input[type="text"]').each(function() {
			if ($(this).val() == "") $(this).addClass("invalid");
			ValidInput($(this));
		});

		$('.step1 input[type="number"]').each(function() {
			if ($(this).val() == "") $(this).addClass("invalid");
		});
		ValidNumber($('input[type="number"]').parent());

		$(".step1 select").each(function() {
			if ($(this).children("option:selected").val() == "")
				$(this).addClass("invalid");
			ValidInput($(this));
		});
	});
		
	$('.step2 button').click(function() {
		$(".step3__content").show("slow");
		$(".step2__content").hide("slow");
		$(".step2__header").removeClass("active").addClass("change");
		$(".step3__header").addClass("active");
	});

	$('.form-submit').one('click',function () {
		$(".step3 select").each(function() {
			if ($(this).children("option:selected").val() == "") $(this).addClass("invalid");
			ValidInput($(this));
		});

		if ($('input[name="exchange"]:checked').val() == undefined) {
			$(".exchange label").addClass("invalid");
			ValidInput($(".exchange label").first());
		}

		if ($('input[name="share"]:checked').val() == undefined) {
			$(".share label").addClass("invalid");
			ValidInput($(".share label").first());
		}
			
		if ($('input[name="spread"]:checked').val() == undefined) {
			$(".spread label").addClass("invalid");
			ValidInput($(".spread label").first());
		}

		if ($('input[name="income"]:checked').val() == undefined) {
			$(".income label").addClass("invalid");
			ValidInput($(".income label").first());
		}	

		if ($('input[name="invest"]:checked').val() == undefined) {
			$(".invest label").addClass("invalid");
			ValidInput($(".invest label").first());
		}
	})
	//
	//radio button step3 action
	$('.income input').click(function () {
		$(".income input").removeClass("invalid").addClass("valid");
		ValidInput($(".income input").first());
	})
	$(".invest input").click(function() {
		$(".invest input").removeClass("invalid").addClass("valid");
		ValidInput($(".invest input").first());
	});
	$(".exchange label").click(function() {
		$(".exchange label").removeClass("invalid").addClass('valid');
		ValidInput($(".exchange label").first());
	});

	$(".share label").click(function() {
		$(".share label").removeClass("invalid").addClass("valid");
		ValidInput($(".share label").first());
	});

	$(".spread label").click(function() {
		$(".spread label").removeClass("invalid").addClass("valid");
		ValidInput($(".spread label").first());
	});
	
	//edit button action
	$(".step1__header span").click(function() {
		$(".step1__content").show("slow");
		$(".step1__header").removeClass("change").addClass("active");
		$(".step2__header").removeClass("active");
	});

	$(".step2__header span").click(function() {
		$(".step2__content").show("slow");
		$(".step2__header").removeClass("change").addClass("active");
		$(".step3__header").removeClass("active");
	});
});
