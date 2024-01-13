<script lang="ts">
	import {
		TransactionType,
		addTransactionFormSchema,
		type AddTransactionFormSchema,
	} from "$lib/addTransactionFormSchema";
	import * as Form from "$lib/components/ui/form";
	import type { SuperValidated } from "sveltekit-superforms";
	export let form: SuperValidated<AddTransactionFormSchema>;
</script>

<Form.Root
	method="POST"
	{form}
	schema={addTransactionFormSchema}
	let:config
	options={{
		validationMethod: "submit-only",
		resetForm: true,
		autoFocusOnError: true,
	}}
>
	<Form.Field {config} name="transactionType">
		<Form.Item>
			<Form.Select
				selected={{
					value: TransactionType.EXPENSE,
					label: "Expense",
				}}
			>
				<Form.SelectTrigger />
				<Form.SelectContent>
					<Form.SelectItem value={TransactionType.EXPENSE}
						>Expense</Form.SelectItem
					>
					<Form.SelectItem value={TransactionType.INCOME}
						>Income</Form.SelectItem
					>
				</Form.SelectContent>
			</Form.Select>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="description">
		<Form.Item>
			<Form.Label>Description</Form.Label>
			<Form.Input autofocus />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="amount">
		<Form.Item>
			<Form.Label>Amount</Form.Label>
			<Form.Input type="number" step={0.01} />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</Form.Root>
