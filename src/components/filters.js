import { ListBox } from 'primereact/listbox';
import { signal } from "@preact/signals-react";
import { services } from '../functions/service.js';

import { Dropdown } from 'primereact/dropdown';

export const filteredServices = signal([]);
const typeFilter = signal("all");
const costFilter = signal(0);
const conditionsFilter = signal("");

const filterTypes = [
    { label: 'All', value: 'all' },
    { label: 'Behavioral and Cognitive', value: 'bandc' },
    { label: 'Holistic', value: 'holistic' },
    { label: 'Humanistic', value: 'humanistic' },
    { label: 'Interpersonal', value: 'interpersonal' },
    { label: 'Physical', value: 'physical' }
]

const filterCosts = [
    { label: 'All', value: 0 },
    { label: 'Under $50', value: 50 },
    { label: '$50 - $100', value: 100 },
    { label: '$100 - $150', value: 150 },
    { label: '$150 - $200', value: 175 }
]

const filterConditions = [
    { label: 'All', value: 'all' },
    { label: 'Anxiety', value: 'Anxiety' },
    { label: 'Depression', value: 'Depression' },
    { label: 'PTSD', value: 'PTSD' },
    { label: 'Stress-related disorders', value: 'Stress-related disorders' },
    { label: 'Trauma-related Disorders', value: 'Trauma-related Disorders' },
]

function setCostFilter(value) {
    costFilter.value = value;
    filterService(typeFilter.value, costFilter.value, conditionsFilter.value);
}

function setTypesFilter(value) {
    typeFilter.value = value;
    filterService(typeFilter.value, costFilter.value, conditionsFilter.value);
}

function setConditionsFilter(value) {
    conditionsFilter.value = value;
    filterService(typeFilter.value, costFilter.value, conditionsFilter.value);
}

function filterService(type, cost, conditions) {
    let tempServices = [];
    tempServices = services;
    if (type != "all") {
        tempServices = services.filter((service) => service.type == type);
    }
    if (conditions != "all") {
        tempServices = tempServices.filter((service) => service.conditions.includes(conditions));
    }

    if (cost == 0) {
        tempServices = tempServices;
    }
    else if (cost == 200) {
        tempServices = tempServices.filter((service) => service.cost >= cost);
    }
    else {
        tempServices = tempServices.filter((service) => service.cost >= cost && service.cost < cost + 50);
    }

    filteredServices.value = tempServices;
    console.log(filteredServices.value);
}

export function resetFilters() {
    typeFilter.value = "all";
    costFilter.value = 0;
    conditionsFilter.value = "all";
    filteredServices.value = services;
}


export const Filters = () => {
    return (<section className="filters">
        {/* <h2>Filters</h2> */}
        <section >
            <h3 className="textCenter">Categories</h3>
            <Dropdown value={typeFilter.value} onChange={(e) => setTypesFilter(e.value)} options={filterTypes} />
            {/* <ListBox value={typeFilter.value} dataKey="" onChange={(e) => setTypesFilter(e.value)} options={filterTypes} className="" /> */}
        </section>
        <section className="">
            <h3 className="textCenter">Conditions</h3>
            <Dropdown value={conditionsFilter.value} onChange={(e) => setConditionsFilter(e.value)} options={filterConditions} />

            {/* <ListBox value={conditionsFilter.value} onChange={(e) => setConditionsFilter(e.value)} options={filterConditions} className="" /> */}
        </section>
        <section className="">
            <h3 className="textCenter">Cost</h3>
            <Dropdown value={costFilter.value} onChange={(e) => setCostFilter(e.value)} options={filterCosts} />

            {/* <ListBox value={costFilter.value} onChange={(e) => setCostFilter(e.value)} options={filterCosts} className="" /> */}

        </section>
        <button onClick={resetFilters} className="primary btn">Reset Filters</button>


    </section>)
}