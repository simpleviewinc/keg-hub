var states = {
	defaultType: "default",
	types: {
		active: {
			shade: "light",
			opacity: 1
		},
		"default": {
			shade: "main",
			opacity: 1
		},
		disabled: {
			shade: "main",
			opacity: 0.4
		},
		hover: {
			shade: "dark",
			opacity: 1
		}
	}
};
var colors = {
	defaultType: "default",
	types: {
		"default": {
			palette: "gray"
		},
		primary: {
			palette: "green"
		},
		secondary: {
			palette: "blue"
		},
		warn: {
			palette: "orange"
		},
		danger: {
			palette: "red"
		}
	},
	palette: {
		transparent: "rgba(255,255,255,0)",
		white01: "#ffffff",
		white02: "#fafafa",
		white03: "#f5f5f5",
		black: [
			20,
			"#333333",
			-20
		],
		gray: [
			45,
			"#999999",
			-20
		],
		blue: [
			20,
			"#2196F3",
			-20
		],
		green: [
			20,
			"#02b4a3",
			-20
		],
		orange: [
			20,
			"#ff5f01",
			-20
		],
		red: [
			20,
			"#f51f10",
			-20
		],
		purple: [
			20,
			"#782dad",
			-20
		]
	}
};
var layout = {
	sides: [
		"left",
		"right",
		"top",
		"bottom"
	],
	margin: 15,
	padding: 15
};
var font = {
	size: 16,
	spacing: 0.15,
	bold: "700",
	units: "px",
	family: "Roboto,\"Helvetica Neue\",Arial,\"Noto Sans\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\"",
	components: {
	}
};
var form = {
	border: {
		radius: 5
	},
	input: {
		height: 35
	},
	"switch": {
		space: 15,
		height: 20,
		width: 20
	},
	checkbox: {
		space: 15,
		height: 20,
		width: 20
	},
	select: {
		height: 35
	}
};
var modal = {
	width: 600
};
var defaults = {
	states: states,
	colors: colors,
	layout: layout,
	font: font,
	form: form,
	modal: modal
};

export { defaults as d };
//# sourceMappingURL=defaults-0fca2f7d.js.map
