import React, { useState } from "react";
import {MantineProvider, Text, Stack, Checkbox, Group, Button} from "@mantine/core";
import { Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { theme } from "./theme";
import { Slider } from '@mantine/core';
/*import {SegmentedToggle} from "./SegmentedToggle";*/

export default function App() {
    const form = useForm({
        // initialValues: {
        //     email: '',
        //     termsOfService: false,
        // },

        // validate: {
        //     email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        // },
    });

    const [wastePerMonth, setWastePerMonth] = useState(100)
    const [needsArray, setNeedsArray] = useState(['car'])
    const [audiNeeded, setAudiNeeded] = useState(true)
    const [apartmentNeeded, setApartmentNeeded] = useState(false)
    const [renovationNeeded, setRenovationNeeded] = useState(false)
    const [expectedIncomeOnPension, setExpectedIncomeOnPension] = useState(200)
    const [accumulation, setAccumulation] = useState(0)
    const [expectedPercentForMoney, setExpectedPercentForMoney] = useState(5.0)
    const [expectedYearsForPension, setExpectedYearsForPension] = useState(7)
    const [calculatedExpectedSalaryPerMonth, setCalculatedExpectedSalaryPerMonth] = useState(100)
    const [showResult, setShowResult] = useState(false)

    const handleAnswerOptionClickFun = () => {
        let needsCost = 0;
        if (audiNeeded) {
            needsCost += 3_000_000;
        }
        if (apartmentNeeded) {
            needsCost += 9_300_000;
        }
        if (renovationNeeded) {
            needsCost += 3_000_000;
        }
        let wasteForYears = expectedYearsForPension * 12 * (wastePerMonth * 1000);
        needsCost += wasteForYears

        let requiredAccumulations = ((expectedIncomeOnPension * 1000) / expectedPercentForMoney) * 100 * 12;
        setAccumulation(Number((requiredAccumulations).toFixed(0)))

        let requiredSalaryPerMonth = ((needsCost + requiredAccumulations) / expectedYearsForPension) / 12;
        let roundedResult = Number((requiredSalaryPerMonth / 1000).toFixed(0));
        setCalculatedExpectedSalaryPerMonth(roundedResult)

        setShowResult(true)
    }

    const handleCalculateAgainClickFun = () => {
        setShowResult(false)
    }

    return (
        <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
            <Stack align="center" mt={50}>
                <Box sx={{ maxWidth: 700 }} mx="auto">
                    <Text size="xl" weight={500}>
                        Programist salary calculator
                    </Text>
                    {/*<SegmentedToggle/>*/}
                    <br/>
                    {
                        showResult
                            ?
                            <div className="result__section">
                                <div>
                                    Вам нужно зарабатывать {calculatedExpectedSalaryPerMonth}_000 р/мес! <br/><br/>
                                    С такой зарплатой ты сможешь себе позволить раннюю пенсию
                                    с пассивным доходом {expectedIncomeOnPension}_000 р/мес
                                    через {expectedYearsForPension} лет и желаемое имущество. <br/><br/>
                                    Имущество и накопления:<br/>
                                    {audiNeeded ? ' [Audi Q3 Sportback]' : ''}<br/>
                                    {apartmentNeeded ? ' [3-к квартира в Центре Воронежа' : ''}
                                    {renovationNeeded ? ' + ремонт]' : (apartmentNeeded ? ']' : '')}<br/>
                                    Накопления: {accumulation} рублей.
                                </div>
                                <Group position="left" mt="md">
                                    <Button onClick={() => handleCalculateAgainClickFun()} type="submit">Сбросить все!</Button>
                                </Group>
                            </div>
                            :
                            <div className="questions__section">
                                <Text size="md" weight={500}>
                                    Этот калькулятор может посчитать сколько вам нужно зарабатывать для раннего выхода на пенсию.
                                </Text>
                                <br/>
                                {/*https://mantine.dev/form/use-form/!*/}
                                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                                    <Text size="sm">Ежемесячные расходы</Text>
                                    <br/>
                                    <Slider
                                        color="green"
                                        size="sm"
                                        radius="md"
                                        min={50}
                                        defaultValue={wastePerMonth}
                                        max={150}
                                        step={5}
                                        marks={[
                                            { value: 70, label: '70к руб/мес' },
                                            { value: 100, label: '100к руб/мес' },
                                            { value: 130, label: '130к руб/мес' },
                                        ]}
                                        onChangeEnd={(value => {
                                            setWastePerMonth(value)
                                        })}
                                    />
                                    <br/>
                                    <br/>
                                    <Checkbox.Group
                                        defaultValue={needsArray}
                                        label="Каким имуществом хотите обзавестись?"
                                        description="Не стесняйтесь при выборе"
                                        value={needsArray}
                                        onChange={(valueArray => {
                                            //disable 'renovation' checkbox if there are no 'flat3k' selected
                                            let newVal;
                                            if (valueArray.some(x => x === "flat3k")) {
                                                newVal = valueArray;
                                            } else {
                                                newVal = valueArray.filter((it) => it !== "renovation");
                                            }
                                            setNeedsArray(newVal)

                                            setAudiNeeded(false)
                                            setApartmentNeeded(false)
                                            setRenovationNeeded(false)
                                            newVal.forEach(v => {
                                                if (v === "car") {
                                                    setAudiNeeded(true)
                                                } else if (v === "flat3k") {
                                                    setApartmentNeeded(true)
                                                } else if (v === "renovation") {
                                                    setRenovationNeeded(true)
                                                }
                                            })
                                        })}
                                    >
                                        <Checkbox
                                            value="car"
                                            label="Audi Q3 Sportback"
                                            {...form.getInputProps('audiQ3', { type: 'checkbox' })}
                                        />
                                        <br/>
                                        <Checkbox
                                            value="flat3k"
                                            label={"3-к квартира в Центре Воронежа"}
                                            {...form.getInputProps('flat3k', { type: 'checkbox' })}
                                        />
                                        <br/>
                                        <Checkbox
                                            value="renovation"
                                            disabled={!apartmentNeeded}
                                            label={"+ ремонт"}
                                            {...form.getInputProps('renovation', { type: 'checkbox' })}
                                        />
                                    </Checkbox.Group>
                                    <br/>
                                    <Text size="sm">Сколько хотите получать пассивного дохода после выхода на пенсию?</Text>
                                    <br/>
                                    <Slider
                                        color="green"
                                        size="sm"
                                        radius="md"
                                        min={50}
                                        defaultValue={expectedIncomeOnPension}
                                        max={250}
                                        step={5}
                                        marks={[
                                            { value: 70, label: '70к руб/мес' },
                                            { value: 150, label: '150к руб/мес' },
                                            { value: 230, label: '230к руб/мес' },
                                        ]}
                                        onChangeEnd={(value) => { setExpectedIncomeOnPension(value) }}
                                    />
                                    <br/>
                                    <br/>
                                    <Text size="sm">Ожидаемый процент от вклада?</Text>
                                    <br/>
                                    <Slider
                                        color="green"
                                        size="sm"
                                        radius="md"
                                        min={0.1}
                                        defaultValue={expectedPercentForMoney}
                                        max={9.9}
                                        step={0.1}
                                        marks={[
                                            { value: 1.0, label: '1% годовых' },
                                            { value: 5.0, label: '5% годовых' },
                                            { value: 8.0, label: '8% годовых' },
                                        ]}
                                        onChangeEnd={(value) => { setExpectedPercentForMoney(value) }}
                                    />
                                    <br/>
                                    <br/>
                                    <Text size="sm">Через сколько лет хотите выйти на пенсию?</Text>
                                    <br/>
                                    <Slider
                                        color="green"
                                        size="sm"
                                        radius="md"
                                        min={1}
                                        defaultValue={expectedYearsForPension}
                                        max={20}
                                        step={1}
                                        marks={[
                                            { value: 1, label: '1 год' },
                                            { value: 7, label: '7 лет' },
                                            { value: 15, label: '15 лет' },
                                            { value: 20, label: 'в старости' },
                                        ]}
                                        onChangeEnd={(value) => { setExpectedYearsForPension(value) }}
                                    />
                                    <br/>
                                    <br/>
                                    <Group position="right" mt="md">
                                        <Button onClick={() => handleAnswerOptionClickFun()} type="submit">Посчитать</Button>
                                    </Group>
                                </form>
                            </div>
                    }
                </Box>
            </Stack>
        </MantineProvider>
    );
}