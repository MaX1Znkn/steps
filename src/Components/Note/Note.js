const Note = ({ item, onDel }) => {
	return (
		<tr>
			<td>{item.date}</td>
			<td>{item.distance}</td>
			<td>
				<span
					className="material-icons"
					onClick={() => onDel(item.date)}
				>
					highlight_off
				</span>
			</td>
		</tr>
	);
};

export default Note;
