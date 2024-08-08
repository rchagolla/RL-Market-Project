import { Schema, model } from "mongoose";

// Inventory Interface
interface IInventory {
  userId: string;
  itemId: string;
  qty: number;
};

// Inventory Schema
const inventorySchema = new Schema<IInventory>({
  userId: {type: String, required: true},
  itemId: {type: String, required: true},
  qty: {type: Number, required: true}
});

// Inventory Model
const Inventory = model<IInventory>('Inventory', inventorySchema);

export { Inventory };