import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";


interface _Props {
    title: string[], 
    currentValue: number, 
    setValue: (data: number) => void
};

const CustomTabsHeaderBar: React.FC<_Props> = ({
    title, currentValue, setValue
}) => {
    

    return (
        <Tabs 
            value={currentValue}
            onChange={(_e, newValue) => {
                setValue(newValue);
            }} 
            aria-label="basic tabs example"
            textColor="secondary"
            indicatorColor="secondary"
        >
            {
                title.map((titleName, index) => (
                    <Tab key={index}
                        label={titleName}
                        id={`simple-tab-${index}`}
                        aria-controls={`simple-tabpanel-${index}`}
                    />
                ))
            }
        </Tabs>
    );
}

export default CustomTabsHeaderBar;