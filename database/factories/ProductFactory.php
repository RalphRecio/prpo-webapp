<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Type;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'barcode' => $this->faker->unique()->ean13(),
            'item_code' => $this->faker->unique()->bothify('ITEM###'),
            'item_description' => $this->faker->sentence(3),
            'uom' => $this->faker->randomElement(['PCS', 'KG', 'L']),
            'stock_type' => $this->faker->randomElement(['Type1', 'Type2', 'Type3']),
            'shelf_life_value' => $this->faker->numberBetween(1,3 ),
            'shelf_life_unit' => $this->faker->randomElement(['Years', 'Months']),
            'origin' => $this->faker->country(),
            'packing' => $this->faker->randomElement(['Box', 'Bag', 'Pallet']),
            'quantity' => $this->faker->numberBetween(10, 1000),
            'tl_order_qty' => $this->faker->numberBetween(10, 500),
            'cnsgmnt_buff_qty' => $this->faker->numberBetween(5, 200),
            'image' => $this->faker->imageUrl(640, 480, 'products', true),
             'type_id' => Type::inRandomOrder()->first()->id,
        ];
    }
}
