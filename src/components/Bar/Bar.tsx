import styles from './Bar.module.css';

export default function Bar({
    title,
    values,
    maxValue,
    colors,
}: {
    title: string;
    values: any;
    maxValue: number;
    colors: any;
}) {
    return (
        <div className={styles.container}>
            {Object.keys(values).map((value: any, index: number) => {
                return (
                    <div
                        key={index}
                        className={styles.bar}
                        style={{
                            width: `${(values[value] / maxValue) * 100}%`,
                            backgroundColor: colors[index],
                        }}
                    >
                        <div className={styles.tooltip}>
                            {value}: {Math.floor(values[value] / 1000)}kb
                        </div>
                        <p className={styles.title}>{title}</p>
                    </div>
                );
            })}
        </div>
    );
}
