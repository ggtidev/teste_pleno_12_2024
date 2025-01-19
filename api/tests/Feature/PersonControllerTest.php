<?php

namespace Tests\Feature;

use App\Models\Person;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Tests\TestCase;

class PersonControllerTest extends TestCase
{
    use RefreshDatabase;
    /**  @test */
    public function it_should_create_person(): void
    {
        $personData = Person::factory()->make()->toArray();

        $response = $this->post(route('person.store'), [
            'nickname' => $personData['nickname'],
            'name' => $personData['name'],
            'birth' => Carbon::parse($personData['birth'])->format('Y-m-d')
        ]);

        $this->assertDatabaseHas('people', [
            'nickname' => $personData['nickname'],
            'name' => $personData['name'],
            'birth' => $personData['birth']
        ]);

        $response->assertStatus(ResponseAlias::HTTP_CREATED);
    }

    /**  @test */
    public function it_should_update_person(): void
    {
        $person = Person::factory()->create();

        $personData = Person::factory()->make()->toArray();

        $response = $this->put(route('person.update', $person->id), [
            'nickname' => $personData['nickname'],
            'name' => $personData['name'],
            'birth' => Carbon::parse($personData['birth'])->format('Y-m-d')
        ]);

        $this->assertDatabaseHas('people', [
            'nickname' => $personData['nickname'],
            'name' => $personData['name'],
            'birth' => $personData['birth']
        ]);

        $response->assertStatus(ResponseAlias::HTTP_OK);
    }

    /**  @test */
    public function it_should_delete_person(): void
    {
        $person = Person::factory()->create();

        $response = $this->delete(route('person.destroy', $person->id));

        $this->assertDatabaseMissing('people', [
            'id' => $person->id
        ]);

        $response->assertStatus(ResponseAlias::HTTP_NO_CONTENT);
    }

    /**  @test */
    public function it_should_list_people(): void
    {
        Person::factory()->count(10)->create();

        $response = $this->get(route('person.index'));

        $response->assertStatus(ResponseAlias::HTTP_OK);

        $response->assertJsonCount(10);
    }

    /**  @test */
    public function it_should_list_people_with_search(): void
    {
        $person = Person::factory()->count(10)->create();

        $response = $this->get(route('person.index', ['t' => $person[0]->name]));

        $response->assertStatus(ResponseAlias::HTTP_OK);

        $response->assertJsonCount(1);
    }

    /**  @test */
    public function it_should_show_person(): void
    {
        $person = Person::factory()->create();

        $response = $this->get(route('person.show', $person->id));

        $response->assertStatus(ResponseAlias::HTTP_OK);

        $response->assertJson([
            'id' => $person->id,
            'nickname' => $person->nickname,
            'name' => $person->name,
            'birth' => $person->birth
        ]);
    }

    /**  @test */
    public function it_should_validate_when_the_name_field_is_a_number(): void
    {
        $personData = Person::factory()->make()->toArray();

        $response = $this->post(route('person.store'), [
            'nickname' => $personData['nickname'],
            'name' => 1,
            'birth' => Carbon::parse($personData['birth'])->format('Y-m-d')
        ]);

        $response->assertStatus(ResponseAlias::HTTP_BAD_REQUEST);
    }
}
