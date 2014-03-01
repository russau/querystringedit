function makeSpans(uri) {

	$('#txtQs').text('');
	var qs = $.url(uri).attr('query');
	var q = qs.split(/&|;/);

	var minusqs = uri.replace(qs, '');

	//fix this? can't really rely on this to find the "Front" of the url
	// e.g. http://www.host.com?host.com
	$('#txtQs').append(minusqs);
	for (var i = 0; i < q.length; i++) {
		if (i!=0) $('#txtQs').append('&');
		$('#txtQs').append($('<span class=qpair>').text(q[i]));
	}

}

function updatetable(qs) {
	var url = $.url(qs);
	$("#tblParams tbody tr:gt(0)").remove();
	for (p in url.param()) {
		$("#tblParams tbody")
		.append($('<tr class=phover>')
		.append($('<td>').append($('<div contenteditable="true">').text(p)))
		.append($('<td>').append($('<div contenteditable="true">').text(url.param(p))))
		.append('<td><button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-remove"></span></button></td>'));
	}
}

$(function() {
	var qs = 'https://accounts.google.com/ServiceLogin?service=lso&passive=1209600&continue=https://accounts.google.com/o/openid2/auth?zt%3DChRhSVhlbDY0dmJvSE1jMzl3SmZwYhIfOG01RTQ1X2syalFSRW5wNlVBUEZtMEVLWlRlbGlBSQ%25E2%2588%2599APsBz4gAAAAAUwbS18GnTG83mHC3WWB62jRB3nFndgou%26from_login%3D1%26hl%3Den-US%26as%3D-62aed20607f627aa&shdf=Ch0LEgZkb21haW4aEVN0YWNrb3ZlcmZsb3cuY29tDBIDbHNvIhSi49y1-Nw7bX1dzBwBoj3irdHb2igBMhR_ASnQCLNDqeLk4O0ICNlYuJy29A&sarp=1&scc=%F0%9F%98%90'

	qs = 'https://www.amazon.com/ap/signin/187-2073321-1477426?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fcss%2Fhomepage.html%3Fie%3DUTF8%26ref_%3Dgno_yam_ya';

	$('#txtQs').on("focusin", function () {
		// remove classes from text box spans
		$(this).find('span').attr('class', '');
	});
	$('#txtQs').on("focusout", function () {
		// recreate the spans when focus leaves the text box
		makeSpans($(this).text());
	});

	$('#txtQs').on("keyup", function () {
		updatetable($(this).text());
	});

	$("#tblParams").on("mouseover", ".phover", function () {
		var pos = $(".phover").index(this);
		$('.qpair').eq(pos).css('background-color', '#f5f500');
	});

	$("#tblParams").on("click", "button", function() {
		var pos = $("#tblParams button").index(this);
		//need to deal with ? at the start of the qs
		// and I'm not removing the &
		$('.qpair').eq(pos).remove();
		$('.phover').eq(pos).remove();
	});

	$("#tblParams").on("mouseout", ".phover", function () {
		$('.qpair').css('background-color', '');
	});

	$("#txtQs").on("mouseover", ".qpair", function () {
		var pos = $(".qpair").index(this);
		$('.phover').eq(pos).toggleClass("hovered");
	});

	$("#txtQs").on("mouseout", ".qpair", function () {
		$('.phover').toggleClass("hovered");
	});

	$('#tblParams').on("keyup", "div", function () {
		var pos = $('#tblParams tr').index($(this).closest('tr')) - 1;
		var str = $(this).closest('tr').find('div:eq(0)').text() + '=' +  $(this).closest('tr').find('div:eq(1)').text();
		var qpair = $('.qpair').eq(pos).text(str);
	});

	updatetable(qs);
	makeSpans(qs);
});