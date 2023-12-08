import {test, expect, describe} from 'vitest';
import request from 'supertest';
import { app } from '../src/app';

describe("GET /", () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYW5kYUBqc29uLmNvbSIsInVzZXJJZCI6ImE2YTI4ZjA0LTJhODQtNGY1OC1iZjdhLWRhMzQwMDZmYTE0OSIsImlhdCI6MTcwMjA0MDAwMCwiZXhwIjoxNzAyMDQxODAwfQ.BVffLTFTEfgzpg5-8ucA4zOsgR0VTl4q7U30RYPoXlM';
    test("responds with status 401 unauthorized without token", async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(401);
    });
    test("responds with status 200 passing the token", async () => {
        const res = await request(app).get('/').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
    test("responds with body if is an Array", async () => {
        const res = await request(app).get('/').set('Authorization', `Bearer ${token}`);
        expect(res.body).toBeInstanceOf(Array);
    });

    test("responds /user with body if is an Object", async () => {
        const res = await request(app).get('/user').set('Authorization', `Bearer ${token}`);
        expect(res.body).toBeInstanceOf(Object);
    });
    test("responds /user with status 200 passing the token", async () => {
        const res = await request(app).get('/user').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
});