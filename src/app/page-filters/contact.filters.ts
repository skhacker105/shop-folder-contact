import { IContact, IFilterOptions, anyFilters } from "shop-folder-core";
import { Collection } from 'dexie';

const contactPageFilter: anyFilters[] = [
    {
        column: 'types',
        description: 'Filter your data by tags',
        filterType: 'multiValue',
        name: 'Categories',
        options: [] as IFilterOptions[],
        type: 'checkbox',
        selectedOptions: [],
        createMultiFilter: (selectedOptions: IFilterOptions[]) => {
            return (collection: Collection<IContact, number>) => {
                return collection.filter(contact =>
                    contact.types.some(type =>
                        selectedOptions.some(option => option.label === type)
                    )
                );
            }
        },
        getOptions: async () => {
            console.log('cslling getOptions')
            const data: IFilterOptions[] = (
                await this.dbService.currentDB.contactTypes.toArray()
            )
                .map(contactType => {
                    return {
                        label: contactType.name,
                        value: contactType.id
                    } as IFilterOptions
                });
            console.log({ data })
            return data;
        },
    } as IMultiValueFilter
];