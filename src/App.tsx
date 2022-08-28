import {MantineProvider, Text, Stack, Checkbox, TextInput, Group, Button} from "@mantine/core";
import { Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { theme } from "./theme";
import { Slider } from '@mantine/core';

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

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Stack align="center" mt={50}>
          <Box sx={{ maxWidth: 700 }} mx="auto">
              <Text size="xl" weight={500}>
                  Programist salary calculator
              </Text>
              <br/>
              <Text size="md" weight={500}>
                  Этот калькулятор может посчитать сколько вам нужно зарабатывать для раннего выхода на пенсию!
              </Text>
              <br/>
              {/*https://mantine.dev/form/use-form/*/}
              <form onSubmit={form.onSubmit((values) => console.log(values))}>
                  <Text size="sm">Ежемесячные расходы</Text>
                  <br/>
                  <Slider
                      color="green"
                      size="sm"
                      radius="md"
                      min={50}
                      defaultValue={100}
                      max={150}
                      step={5}
                      marks={[
                          { value: 70, label: '70к руб/мес' },
                          { value: 100, label: '100к руб/мес' },
                          { value: 130, label: '130к руб/мес' },
                      ]}
                  />
                  <br/>
                  <br/>
                  <Text size="sm">Каким имуществом хотите обзавестись?</Text>
                  <br/>
                  <Checkbox
                      checked
                      label="Audi Q3 Sportback"
                      {...form.getInputProps('audiQ3', { type: 'checkbox' })}
                  />
                  <br/>
                  <Checkbox
                      checked
                      label={"3-к квартира в Центре Воронежа"}
                      {...form.getInputProps('flat3k', { type: 'checkbox' })}
                  />
                  <br/>
                  <Checkbox
                      checked
                      label={"(+ ремонт)"}
                      {...form.getInputProps('renovation', { type: 'checkbox' })}
                  />
                  <br/>
                  <Text size="sm">Сколько хотите получать пассивного дохода после выхода на пенсию?</Text>
                  <br/>
                  <Slider
                      color="green"
                      size="sm"
                      radius="md"
                      min={50}
                      defaultValue={200}
                      max={250}
                      step={5}
                      marks={[
                          { value: 70, label: '70к руб/мес' },
                          { value: 150, label: '150к руб/мес' },
                          { value: 230, label: '230к руб/мес' },
                      ]}
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
                      defaultValue={5.0}
                      max={9.9}
                      step={0.1}
                      marks={[
                          { value: 1.0, label: '1% годовых' },
                          { value: 5.0, label: '5% годовых' },
                          { value: 8.0, label: '8% годовых' },
                      ]}
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
                      defaultValue={10}
                      max={20}
                      step={1}
                      marks={[
                          { value: 1, label: '1 год' },
                          { value: 7, label: '7 лет' },
                          { value: 15, label: '15 лет' },
                          { value: 20, label: 'в старости' },
                      ]}
                  />
                  <br/>
                  <br/>
                  <Group position="right" mt="md">
                      <Button type="submit">Посчитать</Button>
                  </Group>
              </form>
          </Box>
      </Stack>
    </MantineProvider>
  );
}
