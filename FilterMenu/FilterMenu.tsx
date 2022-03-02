import styles from "./FilterMenu.module.less";
import { Row, Button, Checkbox, Menu } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { VFC, useState } from "react";

interface FilterMenuProps {
    clearFilters: () => void;
    onRoleFilterChange: (name: CheckboxValueType[] | undefined) => void;
    onCompanyFilterChange: (value: number[]) => void;
}

enum MemberRole {
    SUPER_ADMIN = "Super_Admin",
    ADMIN = "Admin",
    STANDARD_MEMBER = "Standard_Member",
}

const companies = [
    { id: 1, name: "Google" },
    { id: 2, name: "Facebook" },
];

const checkboxOptions = [
    { label: "Super admin", value: MemberRole.SUPER_ADMIN },
    { label: "Admin", value: MemberRole.ADMIN },
    {
        label: "Standard member",
        value: MemberRole.STANDARD_MEMBER,
    },
];

const FilterMenu: VFC<FilterMenuProps> = ({
    clearFilters,
    onCompanyFilterChange,
    onRoleFilterChange,
}) => {
    const [selectedRoleKeys, setSelectedRoleKeys] = useState<
        CheckboxValueType[]
    >([]);
    const [selectedCompanyKeys, setSelectedCompanyKeys] = useState<number[]>(
        []
    );

    const filterColumnItems = () => {
        onCompanyFilterChange(selectedCompanyKeys!);
        onRoleFilterChange(selectedRoleKeys!);
        clearFilters();
    };

    const handleReset = () => {
        setSelectedRoleKeys([]);
        setSelectedCompanyKeys([]);
    };

    return (
        <div className={styles.filterMenuContainer}>
            <Menu mode='inline' openKeys={["role", "company"]}>
                <Menu.SubMenu title='Role' key='role'>
                    <Checkbox.Group
                        value={selectedRoleKeys}
                        options={checkboxOptions}
                        onChange={(checkedValues) =>
                            setSelectedRoleKeys(checkedValues)
                        }
                    />
                </Menu.SubMenu>
                <Menu.SubMenu title='Company' key='company'>
                    <Checkbox.Group
                        value={selectedCompanyKeys}
                        onChange={(checkedValues: any[]) =>
                            setSelectedCompanyKeys(checkedValues)
                        }
                        options={companies?.map((company) => ({
                            value: company.id!,
                            label: company.name,
                        }))}
                    />
                </Menu.SubMenu>
            </Menu>
            <Row
                justify='space-between'
                align='middle'
                className={styles.buttons}
            >
                <Button
                    disabled={
                        Boolean(!selectedRoleKeys.length) &&
                        Boolean(!selectedCompanyKeys.length)
                    }
                    type='text'
                    onClick={handleReset}
                    size='small'
                >
                    Reset
                </Button>
                <Button size='small' type='primary' onClick={filterColumnItems}>
                    Filter
                </Button>
            </Row>
        </div>
    );
};

export default FilterMenu;
