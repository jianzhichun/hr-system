import './Employee.scss';

export default function Employee(props) {
    const item = props.item;

    function showNull(item) {
        return item === null ? '-' : item;
    }

    function beautifyTime(time) {
        if (time === null) return null;
        return time.slice(0, 10);
    }

    return (
        <div className={'employee'}>
            <div className={'items'}>
                <div className={'name'}>
                    {item.name}
                </div>
                <div className={'email'}>
                    {item.email}
                </div>
                <div className={'age'}>
                    {showNull(item.age)}
                </div>
                <div className={'enrol'}>
                    {showNull(beautifyTime(item.enrolTime))}
                </div>
                <div className={'resign'}>
                    {showNull(beautifyTime(item.resignTime))}
                </div>
                <div className={'contact'}>
                    {showNull(item.phoneNumber)}
                </div>
                <div className={'address'}>
                    {showNull(item.address)}
                </div>
                <div className={'gender'}>
                    {showNull(item.gender)}
                </div>
            </div>

            <div className={'actions'}>
                编辑
            </div>
        </div>
    );
}