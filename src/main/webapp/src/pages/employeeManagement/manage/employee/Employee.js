import './Employee.scss';

export default function Employee(props) {
    const item = props.item;
    return (
        <div className={'employee'}>
            <div>
                {item.name}
            </div>
            <div>
                {item.email}
            </div>
            <div>
                {item.age}
            </div>
            <div>
                {item.enrol}
            </div>
            <div>
                {item.resign}
            </div>
            <div>
                {item.contact}
            </div>
            <div>
                {item.address}
            </div>
            <div>
                {item.gender}
            </div>
        </div>
    );
}