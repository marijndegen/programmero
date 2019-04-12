import React from "react";
class NotFound extends React.Component {
	render() {
		return (
			<div className="bg-img">
				<div className="center-404">
					<h1 className="h1">404</h1>
					<h2 className="h2">Pagina niet gevonden</h2>
					<a className="btn btn-light" href="/">Ga naar Programmero</a>
				</div>
			</div>
		);
	}
}

export default NotFound;
