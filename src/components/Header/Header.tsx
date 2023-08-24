import styles from './Header.module.css';

function ReportDropdown({ description, options, hasColorAccent }: any) {
    return (
        <div className={styles.dropdown}>
            <p className={styles.description}>{description}</p>
            <select className={styles.selectButton}></select>

            {hasColorAccent ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="189"
                    height="6"
                    viewBox="0 0 189 6"
                    fill="none"
                >
                    <rect
                        x="0.16272"
                        y="0"
                        width="37.1286"
                        height="6"
                        fill="#251657"
                    />
                    <rect
                        x="74.4197"
                        y="0"
                        width="39.8789"
                        height="6"
                        fill="#D1366F"
                    />
                    <rect
                        x="114.299"
                        y="0"
                        width="37.1286"
                        height="6"
                        fill="#FF8A5A"
                    />
                    <rect
                        x="151.427"
                        y="0"
                        width="37.1286"
                        height="6"
                        fill="#FFE681"
                    />
                    <rect
                        x="37.2913"
                        y="0"
                        width="37.1286"
                        height="6"
                        fill="#9C2471"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="182"
                    height="7"
                    viewBox="0 0 182 7"
                    fill="none"
                >
                    <rect
                        x="181.22"
                        y="7"
                        width="35.715"
                        height="6"
                        fill="#E3E3E3"
                    />
                    <rect
                        x="109.79"
                        y="7"
                        width="38.3605"
                        height="6"
                        fill="#7D7D7D"
                    />
                    <rect
                        x="71.4299"
                        y="7"
                        width="35.715"
                        height="6"
                        fill="#6F6F6F"
                    />
                    <rect
                        x="35.715"
                        y="7"
                        width="35.715"
                        height="6"
                        fill="#515151"
                    />
                    <rect
                        x="145.505"
                        y="7"
                        width="35.715"
                        height="6"
                        fill="#979797"
                    />
                </svg>
            )}
        </div>
    );
}

export default function Header({ websiteName }: { websiteName: string }) {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <p className={styles.logoName}>SHADOWBOX</p>
                <p className={styles.logoTagline}>Website analytics</p>
            </div>
            {/* Website name is a p tag as this is not the main page title. */}
            <p>{websiteName}</p>

            <div className={styles.dropdownContainer}>
                <ReportDropdown description="Select report" options={[]} />
                <ReportDropdown description="Select date range" options={[]} />
            </div>
        </div>
    );
}
