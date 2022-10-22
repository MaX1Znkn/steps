import Note from "./Note/Note";
import { useState } from "react";

const Form = () => {
	const [forms, setForm] = useState({ date: "", distance: 0 });
	const [formsArr, setFormArr] = useState([]);

	const handleSubmit = (event) => {
		event.preventDefault();
		let isOriginal = true;

		for (let i = 0; i < formsArr.length; i++) {
			if (formsArr[i].date === forms.date) {
				isOriginal = false;
				formsArr[i].distance = +formsArr[i].distance + +forms.distance;

				setFormArr((prev) => [...prev]);
				setForm((prev) => ({ ...prev, distance: 0 }));
			}
		}

		if (isOriginal) {
			setFormArr((prev) => [...prev, forms]);
			setForm((prev) => ({ ...prev, distance: 0 }));
		}
	};

	const handleChange = (event) => {
		const name = event.target.name;
		setForm((prev) => ({ ...prev, [name]: event.target.value }));
	};

	function sorting(a, b) {
		if (a.date > b.date) return 1;
		if (a.date < b.date) return -1;
		return 0;
	}

	function onDel(i) {
		const newArr = formsArr.filter((item) => item.date !== i);
		setForm((prev) => ({ ...prev, distance: 0 }));

		setFormArr(newArr);
	}

	return (
		<div className="container">
			<h2>Учет тренировок</h2>
			<form onSubmit={handleSubmit}>
				<table>
					<tr>
						<th>Дата (ДД.ММ.ГГГ)</th>
						<th>Пройдено КМ</th>
						<th></th>
					</tr>
					<tr>
						<td>
							<input
								type="date"
								id="date"
								name="date"
								value={forms.date}
								onChange={handleChange}
							/>
						</td>
						<td>
							<input
								id="distance"
								type="number"
								name="distance"
								onChange={handleChange}
								value={forms.distance}
							/>
						</td>
						<td>
							<button>OK</button>
						</td>
					</tr>
				</table>
			</form>

			<table>
				<tr>
					<th>Дата (ДД.ММ.ГГГ)</th>
					<th>Пройдено КМ</th>
					<th>Действия</th>
				</tr>

				{formsArr.sort(sorting).map((item, i) => {
					return <Note item={item} onDel={onDel} i={i} key={i} />;
				})}
			</table>
		</div>
	);
};

export default Form;
